'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react'),
    Component = require('react').Component,
    withSideEffect = require('react-side-effect'),
    PropTypes = require('prop-types');

var DocumentMeta = function (_Component) {
  _inherits(DocumentMeta, _Component);

  function DocumentMeta() {
    _classCallCheck(this, DocumentMeta);

    return _possibleConstructorReturn(this, (DocumentMeta.__proto__ || Object.getPrototypeOf(DocumentMeta)).apply(this, arguments));
  }

  _createClass(DocumentMeta, [{
    key: 'render',
    value: function render() {
      if (this.props.children) {
        return Children.only(this.props.children);
      } else {
        return null;
      }
    }
  }]);

  return DocumentMeta;
}(Component);

DocumentMeta.propTypes = {
  tags: PropTypes.array

  /**
   * TO HANDLE CHANGE
   */
};function getMetaFromPropsList(propsList) {
  var innermostProps = propsList[propsList.length - 1];
  if (innermostProps) {
    return innermostProps.tags;
  }
}

function removeMetaNodes() {
  if (typeof document !== 'undefined') {
    var nodes = document.querySelectorAll('meta[data-doc-meta="true"]');
    Array.prototype.slice.call(nodes).forEach(function (node) {
      node.parentNode.removeChild(node);
    });
  }
}

function insertMetaNode(tag) {
  if (tag) {
    var newNode = document.createElement('meta');
    for (var property in tag) {
      if (tag.hasOwnProperty(property)) {
        newNode.setAttribute(property, tag[property]);
      }
    }
    newNode.setAttribute('data-doc-meta', 'true');
    document.getElementsByTagName('head')[0].appendChild(newNode);
  }
}

function insertMetaNodes(tags) {
  if (typeof document !== 'undefined' && tags) {
    Array.prototype.slice.call(tags).forEach(function (tag) {
      insertMetaNode(tag);
    });
  }
}

/**
 * FUNCTIONS TO EXPORT
 */

function reducePropsToState(propsList) {
  var innermostProps = propsList[propsList.length - 1];
  if (innermostProps) {
    return innermostProps.tags;
  }
}

function handleStateChangeOnClient(meta) {
  var _serverMeta = meta ? getMetaFromPropsList(meta) : [];
  removeMetaNodes();

  insertMetaNodes(_serverMeta);
}

module.exports = withSideEffect(reducePropsToState, handleStateChangeOnClient)(DocumentMeta);
