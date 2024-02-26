import { DefaultTheme } from "styled-components/dist/types";

export const darkTheme:DefaultTheme={
    bgColor:"#353b48",
    textColor:"#f5f6fa",
    accentColor:"#4cd137",

}//styled.d.ts에서 적은 유형대로 적어줘야지 하나라도 빠뜨리면 missing error뜸

export const lightTheme:DefaultTheme={
    bgColor:"#whitesmoke",
    textColor:"#black",
    accentColor:"#4cd137",
}//styled.d.ts에서 적은 유형대로 적어줘야지 하나라도 빠뜨리면 missing error뜸