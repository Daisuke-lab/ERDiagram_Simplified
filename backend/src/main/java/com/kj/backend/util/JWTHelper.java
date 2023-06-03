package com.kj.backend.util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.ObjectCodec;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.kj.backend.Account.Account;
import com.kj.backend.Account.AccountRepository;
import com.kj.backend.Room.Room;
import com.kj.backend.User.User;
import com.querydsl.core.types.dsl.BooleanExpression;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import javax.management.RuntimeErrorException;
import javax.servlet.http.HttpServletRequest;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.StringReader;
import java.io.UnsupportedEncodingException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.security.*;
import java.security.interfaces.RSAPublicKey;
import java.security.interfaces.RSAPrivateKey;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;
import java.util.Collections;
import java.util.List;
import java.util.Scanner;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;

@Component
public class JWTHelper {
    public static String token;
    public static JsonNode header;
    public static JsonNode payload;
    public static JsonNode signature;
    public static RSAPrivateKey privateKey;
    public static final String GOOGLE = "google";
    public static final String FACEBOOK = "facebook";
    public static final String GITHUB = "github";
    public static String googleClientId;
    public static final String DUMMY_USERID = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";

    @Autowired
    public AccountRepository accountRepository;

    public JWTHelper(@Value("spring.data.google-client-id") String googleClientId, AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
        this.googleClientId = googleClientId;
    }




    public static String extractToken(@Nullable String authorization) {

        return authorization.replaceAll(" ", "").replaceAll("Bearer", "");
    }

    public static void decodeToken(String token){
        String[] chunks = token.split("\\.");
        Base64.Decoder decoder = Base64.getUrlDecoder();

        if (chunks.length == 3) {
            String headerString = new String(decoder.decode(chunks[0]));
            String payloadString = new String(decoder.decode(chunks[1]));
            ObjectMapper mapper = new ObjectMapper();
            try {
                payload = mapper.readTree(payloadString);
                header = mapper.readTree(headerString);
            } catch (JsonProcessingException e) {
                e.printStackTrace();
            }
        }

    }

    public static void decodeToken(HttpServletRequest request) {
        String authorization = request.getHeader("Authorization");
        if (authorization != null) {
            String token = extractToken(authorization);
            decodeToken(token);
        }
    }

    public static String getIssuer(String token){
        decodeToken(token);
        return payload.get("iss").asText();
    }

    public static boolean verifyToken(String token) throws IOException, GeneralSecurityException {
        String issuer = getIssuer(token);
        if (issuer.contains(GOOGLE)) {
            HttpTransport transport = GoogleNetHttpTransport.newTrustedTransport();
            JsonFactory jsonFactory = GsonFactory.getDefaultInstance();
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(transport, jsonFactory)
                    .setAudience(Collections.singletonList(googleClientId))
                    .build();
            GoogleIdToken idToken = verifier.verify(token);
            return true;
        } else if (issuer.contains(FACEBOOK)) {
            return false;
        } else if (issuer.contains(GITHUB)) {
            return false;
        }
        return false;
    }

    public static String getProvider() {

        if (!isDecoded()) {
            return null;
        }
        String issuer = payload.get("iss").asText();
        if (issuer.contains(GOOGLE)) {
            return GOOGLE;
        } else if (issuer.contains(FACEBOOK)) {
            return FACEBOOK;
        } else if (issuer.contains(GITHUB)) {
            return GITHUB;
        } else {
           return null;
        }
    }

    public static String getUserId(AccountRepository accountRepository) {

        if (!isDecoded()) {
            return DUMMY_USERID;
        }
        PredicatesBuilder builder = new PredicatesBuilder(Room.class, "room");
        String provider = JWTHelper.getProvider();
        String providerAccountId = JWTHelper.payload.get("sub").asText();
        builder.addParam("provider", "=", provider);
        builder.addParam("providerAccountId", "=", providerAccountId);
        BooleanExpression accountExp = builder.build();
        List<Account> accounts =  (List<Account>) accountRepository.findAll(accountExp);
        String userId = null;
        if (accounts.size() > 0) {
            userId = accounts.get(0).getUserId();
        }
        return userId;
    }

    public static String getUserId(HttpServletRequest request, AccountRepository accountRepository) {
        decodeToken(request);
        return getUserId(accountRepository);

    }

    public static Boolean isDecoded() {
        return payload != null && header != null;
    }

}
