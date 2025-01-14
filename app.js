(
  function(){
    "use strict";
    function _classCallCheck(e,t){
      if(!(e instanceof t))
        throw new TypeError("Cannot call a class as a function")
    }

    function _defineProperties(e,t){
      for(var r=0;r<t.length;r++){
        var a=t[r];
        a.enumerable=a.enumerable||!1,
        a.configurable=!0,
        "value"in a&&(a.writable=!0),
        Object.defineProperty(e,a.key,a)}
    }

    function _createClass(e,t,r){
      return t&&_defineProperties(e.prototype,t),r&&_defineProperties(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e
    }

    function _inherits(e,t){
      if("function"!=typeof t&&null!==t)
        throw new TypeError("Super expression must either be null or a function");
        e.prototype=Object.create(t&&t.prototype,{
          constructor:{
            value:e,
            writable:!0,
            configurable:!0}
        }),
        Object.defineProperty(e,"prototype",{writable:!1}),
        t&&_setPrototypeOf(e,t)
    }
    
    function _getPrototypeOf(e){
      return _getPrototypeOf=Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e){
        return e.__proto__||Object.getPrototypeOf(e)
        }, 
        _getPrototypeOf(e)
    }
    
    function _setPrototypeOf(e,t){
      return _setPrototypeOf=Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e,t){
        return e.__proto__=t,e
        },
        _setPrototypeOf(e,t)
    }
    
    function _isNativeReflectConstruct(){
      if("undefined"==typeof Reflect||!Reflect.construct)
        return!1;
      if(Reflect.construct.sham)
        return!1;
      if("function"==typeof Proxy)
        return!0;
      try{
        return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}
      catch(e){
        return!1}
    }
    
    function _assertThisInitialized(e){
      if(void 0===e)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return e
    }
    
    function _possibleConstructorReturn(e,t){
      if(t&&("object"==typeof t||"function"==typeof t))
        return t;
      if(void 0!==t)
        throw new TypeError("Derived constructors may only return object or undefined");
      return _assertThisInitialized(e)
    }
    
    function _createSuper(e){
      var t=_isNativeReflectConstruct();
      return function(){
        var r,a=_getPrototypeOf(e);
        if(t){
          var n=_getPrototypeOf(this).constructor;
          r=Reflect.construct(a,arguments,n)
        } else r=a.apply(this,arguments);
      return _possibleConstructorReturn(this,r)}
    }
    
    var isOperator=/[x/+‑]/, 
    endsWithOperator=/[x+‑/]$/,
    endsWithNegativeSign=/\d[x/+‑]{1}‑$/,
    clearStyle={background:"#ac3939"},
    operatorStyle={background:"#666666"},
    equalsStyle={background:"#004466",position:"absolute",height:130,bottom:5},
    
    Calculator=function(_React$Component){
      _inherits(Calculator,_React$Component); 
      var _super=_createSuper(Calculator);
      
      function Calculator(e){
        var t;
        return _classCallCheck(this,Calculator),
        (t=_super.call(this,e)).state={
          currentVal:"0",
          prevVal:"0",
          formula:"",
          currentSign:"pos",
          lastClicked:""
        },
        t.maxDigitWarning=t.maxDigitWarning.bind(_assertThisInitialized(t)),
        t.handleOperators=t.handleOperators.bind(_assertThisInitialized(t)),
        t.handleEvaluate=t.handleEvaluate.bind(_assertThisInitialized(t)),
        t.initialize=t.initialize.bind(_assertThisInitialized(t)),
        t.handleDecimal=t.handleDecimal.bind(_assertThisInitialized(t)),
        t.handleNumbers=t.handleNumbers.bind(_assertThisInitialized(t)),
        t
      }
      return _createClass(Calculator,[{
        key:"maxDigitWarning",
        value:function(){
          var e=this;
          this.setState({
            currentVal:"Digit Limit Met",
            prevVal:this.state.currentVal
          }),
          setTimeout((function(){
            return e.setState({
              currentVal:e.state.prevVal})}),1e3
          )}
        },{
            key:"handleEvaluate",
            value:function handleEvaluate(){
              if(!this.state.currentVal.includes("Limit")){
                for(var expression=this.state.formula;endsWithOperator.test(expression);)
                  expression=expression.slice(0,-1);
                  expression=expression.replace(/x/g,"*").replace(/‑/g,"-").replace("--","+0+0+0+0+0+0+");
                  var answer=Math.round(1e12*eval(expression))/1e12;
                  this.setState({
                    currentVal:answer.toString(),
                    formula:expression.replace(/\*/g,"⋅").replace(/-/g,"‑").replace("+0+0+0+0+0+0+","‑-").replace(/(x|\/|\+)‑/,"$1-").replace(/^‑/,"-")+"="+answer,
                    prevVal:answer,
                    evaluated:!0})}
            }
        },{
          key:"handleOperators",
          value:function(e){
            if(!this.state.currentVal.includes("Limit")){
              var t=e.target.value,
              r=this.state,
              a=r.formula,
              n=r.prevVal,
              i=r.evaluated;
              this.setState({currentVal:t,evaluated:!1}),
              i ? this.setState({formula:n+t}) 
                : endsWithOperator.test(a)
                  ? endsWithNegativeSign.test(a)
                    ? "‑"!==t&&this.setState({formula:n+t}) 
                    : this.setState({
                      formula:(endsWithNegativeSign.test(a+t)?a:n)+t})
                    : this.setState({prevVal:a,formula:a+t})}}
        },{
          key:"handleNumbers",
          value:function(e){
            if(!this.state.currentVal.includes("Limit")){
              var t=this.state,
              r=t.currentVal,
              a=t.formula,
              n=t.evaluated,
              i=e.target.value;this.setState({evaluated:!1}),
              r.length>21?this.maxDigitWarning():n 
                ? this.setState({currentVal:i,formula:"0"!==i?i:""})
                : this.setState({
                  currentVal:"0"===r||isOperator.test(r)
                  ? i
                  : r+i, formula:"0"===r&&"0"===i
                    ? ""===a
                      ? i
                      : a
                      : /([^.0-9]0|^0)$/.test(a)
                        ? a.slice(0,-1)+i:a+i})}}
        },{
          key:"handleDecimal",
          value:function(){
            !0===this.state.evaluated
              ? this.setState({
              currentVal:"0.",
              formula:"0.",
              evaluated:!1})
              : this.state.currentVal.includes(".") 
              || this.state.currentVal.includes("Limit")
              || (this.setState({evaluated:!1}),
                this.state.currentVal.length>21
                  ? this.maxDigitWarning()
                  : endsWithOperator.test(this.state.formula)
                    || "0"===this.state.currentVal&&""===this.state.formula
                      ? this.setState({currentVal:"0.",formula:this.state.formula+"0."})
                      : this.setState({
                        currentVal:this.state.formula.match(/(-?\d+\.?\d*)$/)[0]+".",
                        formula:this.state.formula+"."}))}
        },{
          key:"initialize",
          value:function(){
            this.setState({
              currentVal:"0",
              prevVal:"0",
              formula:"",
              currentSign:"pos",
              lastClicked:"",
              evaluated:!1})}
        },{
          key:"render",
          value:function(){
            return React.createElement(
              "div",
              null,
              React.createElement(
                "div",
                {className:"calculator"},
                React.createElement(Formula,{formula:this.state.formula.replace(/x/g,"⋅")}),
                React.createElement(Output,{currentValue:this.state.currentVal}),
                React.createElement(Buttons,{
                  decimal:this.handleDecimal,
                  evaluate:this.handleEvaluate,
                  initialize:this.initialize,
                  numbers:this.handleNumbers,
                  operators:this.handleOperators})
              ), React.createElement(
                "div",
                {className:"author"},
                " ",
                "Coding by ",
                React.createElement(
                  "a",
                  {href:"https://www.linkedin.com/in/danielddoan/",target:"_blank"},
                  "- Daniel Doan")
              )
            )
          }
        }
      ]), Calculator
    }
    
    (React.Component),
    Buttons=function(e){
      _inherits(r,React.Component);
      var t=_createSuper(r);
      function r(){
        return _classCallCheck(this,r),t.apply(this,arguments)}
      
      return _createClass(r,[{
        key:"render",
        value:function(){
          return React.createElement(
            "div",
            null,
            React.createElement("button",{
              className:"jumbo",
              id:"clear",
              onClick:this.props.initialize,
              style:clearStyle,
              value:"AC"},"AC"
            ),
            React.createElement("button",{
              id:"divide",
              onClick:this.props.operators,
              style:operatorStyle,
              value:"/"},"/"
            ),
            React.createElement("button",{
              id:"multiply",
              onClick:this.props.operators,
              style:operatorStyle,
              value:"x"},"x"
            ),
            React.createElement("button",{
              id:"seven",
              onClick:this.props.numbers,
              value:"7"},"7"
            ),
            React.createElement("button",{
              id:"eight",
              onClick:this.props.numbers,
              value:"8"},"8"
            ),
            React.createElement("button",{
              id:"nine",
              onClick:this.props.numbers,
              value:"9"},"9"
            ),
            React.createElement("button",{
              id:"subtract",
              onClick:this.props.operators,
              style:operatorStyle,
              value:"‑"},"‑"
            ),
            React.createElement("button",{
              id:"four",
              onClick:this.props.numbers,value:"4"},"4"
            ),
            React.createElement("button",{
              id:"five",
              onClick:this.props.numbers,
              value:"5"},"5"
            ),
            React.createElement("button",{
              id:"six",
              onClick:this.props.numbers,
              value:"6"},"6"
            ),
            React.createElement("button",{
              id:"add",
              onClick:this.props.operators,
              style:operatorStyle,value:"+"},"+"
            ),
            React.createElement("button",{
              id:"one",
              onClick:this.props.numbers,
              value:"1"},"1"
            ),
            React.createElement("button",{
              id:"two",
              onClick:this.props.numbers,
              value:"2"},"2"
            ),
            React.createElement("button",{
              id:"three",
              onClick:this.props.numbers,
              value:"3"},"3"
            ),
            React.createElement("button",{
              className:"jumbo",
              id:"zero",
              onClick:this.props.numbers,
              value:"0"},"0"
            ),
            React.createElement("button",{
              id:"decimal",
              onClick:this.props.decimal,
              value:"."},"."
            ),
            React.createElement("button",{
              id:"equals",
              onClick:this.props.evaluate,
              style:equalsStyle,
              value:"="},"="
            )
          )
        }
      }]),r
    }(),
    
    Output=function(e){
      _inherits(r,React.Component);
      var t=_createSuper(r);
      
      function r(){
        return _classCallCheck(this,r),t.apply(this,arguments)}
      
      return _createClass(r,[{
        key:"render",
        value:function(){
          return React.createElement(
            "div",
            {className:"outputScreen",id:"display"},
            this.props.currentValue)
        }
      }]),r
    }(),
    
    Formula=function(e){
      _inherits(r,React.Component);
      var t=_createSuper(r);
      
      function r(){
        return _classCallCheck(this,r),t.apply(this,arguments)}
      
      return _createClass(r,[{
        key:"render",
        value:function(){
          return React.createElement("div",{className:"formulaScreen"},this.props.formula)
        }
      }]),r
    }();
    
    ReactDOM.render(React.createElement(Calculator,null),document.getElementById("app"))
  }
)();

