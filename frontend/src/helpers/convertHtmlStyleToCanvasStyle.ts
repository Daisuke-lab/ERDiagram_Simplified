import { textAlign } from "@mui/system"


export default function convertHtmlStyleToCanvasStyle(textarea:HTMLTextAreaElement | null) {
    if (textarea !== null) {
        const canvasStyle = {
            fontFamily: textarea.style.fontFamily,
            fontSize: parseInt(textarea.style.fontSize.replace("px", "")),
            fontWeight: blankToUnset(textarea.style.fontWeight),
            fontStyle: blankToUnset(textarea.style.fontStyle),
            textDecorationLine: blankToUnset(textarea.style.textDecorationLine),
            color: RGBToHex(textarea.style.color),
            textAlign: blankToUnset(textarea.style.textAlign)
        }
        return canvasStyle
    }
}

function blankToUnset(anyStyle:string) {
     if (anyStyle == "") {
        return "unset"
     }
     return anyStyle
}


function RGBToHex(rgb:string) {
    // Choose correct separator
    let sep = rgb.indexOf(",") > -1 ? "," : " ";
    // Turn "rgb(r,g,b)" into [r,g,b]
    const rgbItems = rgb.substr(4).split(")")[0].split(sep);
  
    let r = (+rgbItems[0]).toString(16),
        g = (+rgbItems[1]).toString(16),
        b = (+rgbItems[2]).toString(16);
  
    if (r.length == 1)
      r = "0" + r;
    if (g.length == 1)
      g = "0" + g;
    if (b.length == 1)
      b = "0" + b;
  
    return "#" + r + g + b;
  }