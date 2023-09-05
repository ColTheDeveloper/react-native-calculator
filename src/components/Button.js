import { useContext } from "react";
import {Text, TouchableOpacity} from "react-native"
import ThemeContext from "../context/ThemeContext"
import {Styles} from "../styles/GlobalStyles"

export default function Button ({onPress, isGray, isBlue, title}){
    const theme=useContext(ThemeContext);
    return(
        <TouchableOpacity
            style={
                isBlue
                ? Styles.btnBlue
                : isGray
                ? Styles.btnDark
                : theme==="light"
                ? Styles.btnLight
                : Styles.btnDark
            }
            onPress={onPress}
        >
            <Text
                style={
                    isBlue || isGray
                    ?Styles.smallTextLight
                    : theme==="dark"
                    ? Styles.smallTextLight
                    : Styles.smallTextDark
                }
            >{title}</Text>

        </TouchableOpacity>
    )
};