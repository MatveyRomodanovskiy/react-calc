// eslint-disable-next-line no-unused-vars
import React, {useState, useRef} from "react";
import Buttons from "./Buttons";
import CustomTable from "./CustomTable.jsx";
import {Calculator} from "./Calculator";
import {parseInput} from "./utils.js";
import TextField from "@mui/material/TextField";
import "./App.css";
import { Box } from "@mui/material";


const App = () => {
    const [inputValue, setInputValue] = useState("0"); // Значение поля ввода
    const [rows, setRows] = useState([]); // История операций для таблицы
   const calculator = useRef(new Calculator()); // Постоянный экземпляр калькулятора
//    const calculator = (new Calculator());

    const handleButtonClick = (operation) => {
        try {
            if (operation === "reset") {
                calculator.current.reset();
                setInputValue("0");
                setRows([]);
                console.log("Calculator reset. Current Value: 0");
                return;
            }
            if (operation === "calculate" && !calculator.current.lastOperation){
                return;
            }
            if (!calculator.current.lastOperation) {
                const value = parseInput(inputValue); // Значение из поля ввода (если пустое, то 0)
                calculator.current.setValues(value, operation);
                console.log(`Block !calculator.current.lastOperation && operation !== calculate Calculator.current: ${calculator.current}`);
                return;
            }
                const secondOperand = parseInput(inputValue); // Значение из поля ввода (если пустое, то 0);
                const firstOperand = calculator.current.currentValue;
                calculator.current[calculator.current.lastOperation](secondOperand);
                addRowToTable(
                    firstOperand,
                    calculator.current.lastOperation,
                    secondOperand,
                    calculator.current.getResult()
                );
                setInputValue(calculator.current.getResult());
                calculator.current.lastOperation = operation !== 'calculate'? operation : null;
                return;

        } catch (error) {
            alert(error.message);
        }
    };

    const addRowToTable = (firstValue, operation, secondValue, result) => {
        const row = {
            operation: `${firstValue} ${operation} ${secondValue}`,
            value: result,
        };
        setRows((prev) => [...prev, row]);
        console.log("Row added to table:", row);
    };


    return (
        <Box
            sx={{
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                width: 400,          // Задаём фикс. ширину или maxWidth: 400
                margin: "0 auto",    // Чтобы контейнер располагался по центру страницы
                display: "flex",
                flexDirection: "column",
            }}
        >
            <TextField
                variant="outlined"
                label="Enter a number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                // цвет и стили
                color="primary"
                sx={{
                    width: "100%",
                    // Если хотите белый фон (по умолчанию TextField - белый),
                    // можно явно указать:
                    backgroundColor: "white",

                    // Уточняем цвет бордера в разных состояниях:
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                            borderColor: "primary.main", // основной цвет (синий)
                        },
                        "&:hover fieldset": {
                            borderColor: "primary.dark",
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: "primary.dark",
                        },
                    },
                }}
            />
        <br/>
            <Buttons
                buttonData={calculator.current.getActions()}
                onButtonClick={handleButtonClick}

            />

            <CustomTable rows={rows} />
        </Box>
    );
};


export default App;