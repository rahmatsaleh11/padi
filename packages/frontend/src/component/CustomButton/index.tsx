import { Button, buttonClasses, styled } from "@mui/material";

export const BlueSkyButton = styled(Button)`
    &.${buttonClasses.contained} {
        background-color: #25C5DF;
        border-radius: 4px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }

    &.${buttonClasses.containedError} {
        background-color: #FF7276;
        border-radius: 4px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
`