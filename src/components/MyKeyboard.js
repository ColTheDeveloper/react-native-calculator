import {View, Text} from "react-native"
import Button from "./Button"
import { Styles } from "../styles/GlobalStyles"
import { myColors } from "../styles/Colors"
import { useState } from "react"



export default function MyKeyboard(){
    const [firstNumber, setFirstNumber]=useState("")
    const [secondNumber,setSecondNumber]=useState("")
    const [operation,setOperation]=useState("")
    const [result,setResult]=useState(null)

    const handleNumberPress=(number)=>{
        if(firstNumber.length<10){
            if(number==="." &&firstNumber.includes(".")){
                null
            }else if(result!==null){
                setFirstNumber(result+number)
                setResult(null)
            }else{
                setFirstNumber(firstNumber+number)
            }
        }
    }

    const makeCurrentValueNagative=()=>{
        if(firstNumber.includes("-") || result?.toString().includes("-")){
            if(firstNumber==="" && result!==null){
                setFirstNumber(result.toString().replace("-",""))
                setResult(null)
            }else{
                setFirstNumber(firstNumber.replace("-",""))
            }
        }else{
            if(firstNumber==="" && result!==null){
                setFirstNumber("-"+firstNumber)
                setResult(null)
            }else{
                setFirstNumber("-"+firstNumber)
            }

        }
    }

    const handleOperationPress=async(operator)=>{
        if(firstNumber!=="" &&secondNumber!=="" ){
            switch(operation){
                case "+":
                    setSecondNumber(Number(firstNumber)+ Number(secondNumber))
                    break;
                case "-":
                    setSecondNumber(Number(secondNumber)-Number(firstNumber))
                    break;
                case "×":
                    setSecondNumber(Number(firstNumber)*Number(secondNumber))
                    break;
                case "÷":
                    setSecondNumber(Number(secondNumber)/Number(firstNumber))
                    break;
                case "%":
                    setSecondNumber((Number(secondNumber)/100)*Number(firstNumber))
                    break;
                case "":
                    setSecondNumber((Number(secondNumber)/100)*Number(firstNumber))
                    break;
                default :
                    setSecondNumber(0)
                    break;
            }        
            setFirstNumber("")
            setOperation(operator)

        }else if(result!==null){
            setSecondNumber(result)
            setOperation(operator)
            setFirstNumber("")
            setResult(null)
        }else if(firstNumber===""){
            setOperation("")
        }else{
            setOperation(operator)
            setSecondNumber(firstNumber)
            setFirstNumber("")
        } 
        
    }

    const clear=()=>{
        setFirstNumber("")
        setSecondNumber("")
        setOperation("")
        setResult(null)
    }

    const firstNumberDisplay=()=>{
        if(result!==null){
            return <Text style={result<99999? [Styles.screenFirstNumber, {color:myColors.result}]:[Styles.screenFirstNumber,{fontSize:50,color:myColors.result}]}>{result}</Text>
        }

        if(firstNumber && firstNumber.length < 6){
            return <Text style={Styles.screenFirstNumber}>{firstNumber}</Text>
        }
        if(firstNumber===""){
            return <Text style={Styles.screenFirstNumber}>0</Text>
        }
        if(firstNumber.length > 5 && firstNumber.length < 8){
            return(
                <Text style={[Styles.screenFirstNumber, {fontSize:70}]}>{firstNumber}</Text>
            )
        }
        if(firstNumber.length>7){
            return <Text style={[Styles.screenFirstNumber,{fontSize:50}]}>{firstNumber}</Text>
        }
    }

    const getResult=()=>{
        switch(operation){
            case "+":
                clear()
                setResult(Number(firstNumber)+ Number(secondNumber))
                break;
            case "-":
                clear()
                setResult(Number(secondNumber)-Number(firstNumber))
                break;
            case "×":
                clear()
                setResult(Number(firstNumber)*Number(secondNumber))
                break;
            case "÷":
                clear()
                setResult(Number(secondNumber)/Number(firstNumber))
                break;
            case "%":
                clear()
                setResult((Number(secondNumber)/100)*Number(firstNumber))
                break;
            default :
                clear()
                setResult(0)
                break;

        }
    }

    return(
        <View style={Styles.viewBottom}>
            <View style={{
                height:120,
                width:"90%",
                justifyContent:"flex-end",
                alignSelf:"center"
            }}>
                <Text style={Styles.screenSecondNumber}>
                    {secondNumber}
                    <Text style={{color:"purple",fontSize:50,fontWeight:'500'}}>{operation}</Text>
                </Text>
                {firstNumberDisplay()}
            </View>
            <View style={Styles.row}>
                <Button isGray title="C" onPress={clear} />
                <Button isGray title="+/-" onPress={()=>makeCurrentValueNagative()} />
                <Button isGray title="%" onPress={()=>{handleOperationPress("%")}} />
                <Button isBlue title="÷" onPress={()=>{handleOperationPress("÷")}} />    
            </View>
            <View style={Styles.row}>
                <Button title="7" onPress={()=>handleNumberPress("7")} />
                <Button title="8" onPress={()=>handleNumberPress("8")} />
                <Button title="9" onPress={()=>{handleNumberPress("9")}} />
                <Button isBlue title="×" onPress={()=>handleOperationPress("×")} />    
            </View>
            <View style={Styles.row}>
                <Button title="4" onPress={()=>handleNumberPress("4")} />
                <Button title="5" onPress={()=>handleNumberPress("5")} />
                <Button title="6" onPress={()=>{handleNumberPress("6")}} />
                <Button isBlue title="-" onPress={()=>handleOperationPress("-")} />    
            </View>
            <View style={Styles.row}>
                <Button title="1" onPress={()=>handleNumberPress("1")} />
                <Button title="2" onPress={()=>handleNumberPress("2")} />
                <Button title="3" onPress={()=>{handleNumberPress("3")}} />
                <Button isBlue title="+" onPress={()=>handleOperationPress("+")} />    
            </View>
            <View style={Styles.row}>
                <Button title="." onPress={()=>handleNumberPress(".")} />
                <Button title="0" onPress={()=>handleNumberPress("0")} />
                <Button title="⌫" onPress={()=>setFirstNumber(firstNumber.slice(0,-1))} />
                <Button isBlue title="=" onPress={()=>getResult()} />    
            </View>

        </View>

    )
}