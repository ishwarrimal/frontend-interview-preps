import React from "react";

function LoggerHoc(WrapperComponent) {
  return (props) => {
    React.useEffect(() => {
      console.log(`${WrapperComponent} is rendered`);
      return () => {
        console.log(`${WrapperComponent} is unmounted`);
      };
    }, []);

    return <WrapperComponent {...props} />;
  };
}

return LoggerHoc;
