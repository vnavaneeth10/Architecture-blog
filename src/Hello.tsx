

export interface Props {
    name:string;
    enthusiasmLevel?:number;
}

const Hello = ({name,enthusiasmLevel=1}:Props) => {

    if(enthusiasmLevel<=0){
        throw new Error("You need more Josh. :D")
    } 
    return (
        <>
        Hello {name + getExclamationMarks(enthusiasmLevel)}
        </>
    )
}

export default Hello


function getExclamationMarks(numChars:number) {
    return Array(numChars+1).join("!");
}