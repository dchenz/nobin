import { Button, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import "./styles.scss";

const googleCaptchaSiteKey = "6Ldm2_UhAAAAABz-ezCZySus3MAiSnLKw_YYC0K6";

type CaptchaButtonGroupProps = {
  onClick: () => void
  disabled: boolean
  setToken: (_: string | null) => void
}

export default function CaptchaButtonGroup(props: CaptchaButtonGroupProps): JSX.Element {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <div className={isLargeScreen ? "large-screen" : "small-screen"}>
      <div>
        <ReCAPTCHA
          sitekey={googleCaptchaSiteKey}
          onChange={props.setToken}
        />
      </div>
      <Button
        variant="contained"
        size="large"
        onClick={props.onClick}
        disabled={props.disabled}
      >
        Submit
      </Button>
    </div>
  );
}