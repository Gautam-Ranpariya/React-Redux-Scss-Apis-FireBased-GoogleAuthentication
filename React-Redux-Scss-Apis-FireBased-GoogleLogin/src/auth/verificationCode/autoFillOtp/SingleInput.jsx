import React, { memo, useRef, useLayoutEffect } from "react";
import usePrevious from "./usePrevious";
import './singleInput.scss';

export function SingleOTPInputComponent(props) {
  const { focus, autoFocus, ...rest } = props;
  const inputRef = useRef(null);
  const prevFocus = usePrevious(!!focus);
  useLayoutEffect(() => {
    if (inputRef.current) {
      if (focus && autoFocus) {
        inputRef.current.focus();
      }
      if (focus && autoFocus && focus !== prevFocus) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }
  }, [autoFocus, focus, prevFocus]);

  return <input ref={inputRef} {...rest} className="verificationButton"  />;
}

const SingleOTPInput = memo(SingleOTPInputComponent);
export default SingleOTPInput;
