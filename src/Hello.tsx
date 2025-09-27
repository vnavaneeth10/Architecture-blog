import { motion } from "framer-motion";

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
        <motion.div style={{
    color: 'green',
    fontSize: 20,
    width: '300px',
    height: '30px',
    textAlign: 'center',
    border: '2px solid green',
    margin: '40px'
}} whileHover={{ scale: 0.9 }}>
        Hello {name + getExclamationMarks(enthusiasmLevel)}
        </motion.div>

        <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    onAnimationComplete={() => console.log("Animation completed!")}
>
    Content fades in
</motion.div>
      </>  
    )
}

export default Hello


function getExclamationMarks(numChars:number) {
    return Array(numChars+1).join("!");
}