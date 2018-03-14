'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IconUser = function (_React$Component) {
  _inherits(IconUser, _React$Component);

  function IconUser() {
    _classCallCheck(this, IconUser);

    return _possibleConstructorReturn(this, (IconUser.__proto__ || Object.getPrototypeOf(IconUser)).apply(this, arguments));
  }

  _createClass(IconUser, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'svg',
        { width: '57', height: '63', viewBox: '308 246 57 63', pointerEvents: 'none', className: this.props.cssClass, id: this.props.id },
        _react2.default.createElement('path', { fill: this.props.color,
          d: 'M364.571429,297.736607 C364.571429,300.950909 363.59376,303.48883 361.638393,305.350446 C359.683026,307.212063 357.084838,308.142857 353.84375,308.142857 L318.727679,308.142857 C315.486591,308.142857 312.888403,307.212063 310.933036,305.350446 C308.977669,303.48883 308,300.950909 308,297.736607 C308,296.316957 308.046875,294.93081 308.140625,293.578125 C308.234375,292.22544 308.421874,290.765633 308.703125,289.198661 C308.984376,287.631689 309.339284,286.178578 309.767857,284.839286 C310.196431,283.499993 310.772318,282.194203 311.495536,280.921875 C312.218754,279.649547 313.049102,278.564737 313.986607,277.667411 C314.924112,276.770085 316.06919,276.053574 317.421875,275.517857 C318.77456,274.98214 320.267849,274.714286 321.901786,274.714286 C322.142858,274.714286 322.705353,275.002229 323.589286,275.578125 C324.473219,276.154021 325.470977,276.796871 326.582589,277.506696 C327.694202,278.216521 329.140616,278.859372 330.921875,279.435268 C332.703134,280.011164 334.491062,280.299107 336.285714,280.299107 C338.080366,280.299107 339.868295,280.011164 341.649554,279.435268 C343.430812,278.859372 344.877227,278.216521 345.988839,277.506696 C347.100452,276.796871 348.09821,276.154021 348.982143,275.578125 C349.866076,275.002229 350.42857,274.714286 350.669643,274.714286 C352.30358,274.714286 353.796868,274.98214 355.149554,275.517857 C356.502239,276.053574 357.647317,276.770085 358.584821,277.667411 C359.522326,278.564737 360.352675,279.649547 361.075893,280.921875 C361.799111,282.194203 362.374998,283.499993 362.803571,284.839286 C363.232145,286.178578 363.587052,287.631689 363.868304,289.198661 C364.149555,290.765633 364.337053,292.22544 364.430804,293.578125 C364.524554,294.93081 364.571429,296.316957 364.571429,297.736607 Z M351.714286,261.857143 C351.714286,266.116093 350.207604,269.752217 347.194196,272.765625 C344.180789,275.779033 340.544664,277.285714 336.285714,277.285714 C332.026764,277.285714 328.39064,275.779033 325.377232,272.765625 C322.363824,269.752217 320.857143,266.116093 320.857143,261.857143 C320.857143,257.598193 322.363824,253.962069 325.377232,250.948661 C328.39064,247.935253 332.026764,246.428571 336.285714,246.428571 C340.544664,246.428571 344.180789,247.935253 347.194196,250.948661 C350.207604,253.962069 351.714286,257.598193 351.714286,261.857143 Z',
          id: 'user',
          stroke: 'none',
          fillRule: 'evenodd' })
      );
    }
  }]);

  return IconUser;
}(_react2.default.Component);

IconUser.propTypes = {
  color: _propTypes2.default.string, /* Should be a CSS color */
  cssClass: _propTypes2.default.string,
  id: _propTypes2.default.string
};

exports.default = IconUser;