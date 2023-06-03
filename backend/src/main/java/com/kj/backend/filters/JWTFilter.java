package com.kj.backend.filters;


import com.kj.backend.util.JWTHelper;
import lombok.SneakyThrows;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
//@Component
//@Order(1)
@Component
public class JWTFilter extends OncePerRequestFilter {

    @SneakyThrows
    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain filterChain) throws ServletException, IOException {


        if (!shouldBeAuthorized(req)) {
            filterChain.doFilter(req, res);
            return;
        }

        String authorization = req.getHeader("Authorization");
        if (authorization == null) {
            res.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Authorization header is not set");
            return;
        }
        String token = JWTHelper.extractToken(authorization);
        Boolean verified = JWTHelper.verifyToken(token);
        if (!verified) {
            res.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token is not valid");
        } else {
            filterChain.doFilter(req, res);
        }

        return;

    }

    public boolean shouldBeAuthorized(HttpServletRequest req) {
        //room
        String path  = req.getServletPath();
        String method = req.getMethod();
        if (path.contains("room/list")) {
            return true;
        } else if (path.contains("room")) {
            switch(method) {
                case "POST":
                case "DELETE":
                    return true;
                default:
                    return false;
            }
        } else if (path.contains("history")) {
            return true;
        }

        return false;
    }

}
