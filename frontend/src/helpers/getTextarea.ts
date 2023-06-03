

export default function getTextarea()  {
    const textareas = document.getElementsByTagName('textarea')
    return textareas.length > 0?textareas[0]: null
}