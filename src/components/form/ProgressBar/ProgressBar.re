let component = ReasonReact.statelessComponent("ProgressBar");

let make = (~percent: string, ~percentNumber: float, _children) => {
  ...component,
  render: _self =>
    <div>
       <div className="progress-bar" role="progressbar" ariaValuenow={percentNumber} ariaValuemin={0.0} ariaValuemax={100.00} tabIndex={0}>
          <div className="progress-bar-inner" style=(ReactDOMRe.Style.make(~width=percent++"%", ()))/>
       </div>
    </div>
};

[@bs.deriving abstract]
type jsProps = {
  percent: string,
  percentNumber:  float,
};

 let default =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(
      ~percent=jsProps->percentGet,
      ~percentNumber=jsProps->percentNumberGet,
      [||],
    )
  ); 