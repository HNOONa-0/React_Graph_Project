export const handleLines = (c)=>{
    let lines = Array(2 * c - 1);
    let j = 1;
    for (let i = 0; i < lines.length - 1; i += 2) {
        lines[i] = j.toString();
        lines[i + 1] = '\n';
        j++;
    }

    lines[lines.length - 1] = c.toString();
    return lines.join("");
}