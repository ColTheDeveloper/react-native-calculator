import { useState } from "react";
import { Switch,Text, SafeAreaView, StyleSheet,Platform, StatusBar } from "react-native";
import {myColors} from "./src/styles/Colors"
import ThemeContext from "./src/context/ThemeContext";
import MyKeyboard from "./src/components/MyKeyboard";

export default function App(){
  const [theme, setTheme]=useState("light")
  //console.log()
  return(
    <ThemeContext.Provider value={theme}>
      <SafeAreaView style={theme==="light"? styles.container : [styles.container, {backgroundColor:"black"}]}>
        <Switch 
          value={theme==="dark"}
          onValueChange={()=>setTheme(theme==="light"? "dark" : "light")}
          ios_backgroundColor='black'
          trackColor={{false:"black", true:"white"}}
          thumbColor={myColors.gray}
        />
        <MyKeyboard />
      </SafeAreaView>

    </ThemeContext.Provider>

  )
}

const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:myColors.light,
    justifyContent:"flex-start",
    alignItems:"center",
    paddingTop:Platform.OS==="android" ? StatusBar.currentHeight : 0
  }
})


