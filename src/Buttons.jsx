import React, { useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

const Buttons = ({ buttonData, onButtonClick }) => {
    // Состояние для хранения индекса «активной» кнопки
    const [activeIndex, setActiveIndex] = useState(null);

    return (
        <ButtonGroup aria-label="button group"
                     sx={{ width: "100%" }}
        >
            {buttonData.map((button, index) => {
                const isActive = index === activeIndex;
                const isDanger = button.className === "cancel";

                return (
                    <Button
                        key={index}
                        variant={
                            // Если кнопка «опасная», всегда делаем "contained"
                            // (красный фон), иначе используем логику isActive
                            isDanger ? "contained" : isActive ? "contained" : "outlined"
                        }
                        // Если не danger-кнопка, цвет = "primary",
                        // чтобы сохранялся «синий» основной цвет
                        color={isDanger ? undefined : "primary"}
                        onClick={() => {
                            onButtonClick(button.operation);
                            setActiveIndex(index);
                        }}
                        sx={{

                            ...(isDanger
                                ? {
                                    backgroundColor: "red",
                                    color: "white",
                                    borderColor: "red",
                                    "&:hover": {
                                        backgroundColor: "darkred",
                                    },
                                }
                                : {
                                    // Стили для обычной кнопки (как раньше)
                                    // «Активная» (isActive) => "contained primary",
                                    // «Неактивная» => "outlined" с белым фоном, синим текстом
                                    backgroundColor: isActive ? undefined : "white",
                                    color: isActive ? undefined : "primary.main",
                                    borderColor: "primary.main",
                                    "&:hover": {
                                        backgroundColor: isActive ? "primary.dark" : "#f5f5f5",
                                    },
                                }),
                            flex: 1,
                        }}
                    >
                        {button.label}
                    </Button>
                );
            })}
        </ButtonGroup>
    );
};

export default Buttons;
