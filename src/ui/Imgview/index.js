/*!
 * 文件描述
 * @author ydr.me
 * @create 2015-01-04 21:43
 */


define(function (require, exports, module) {
    /**
     * @module ui/Viewer
     */
    'use strict';


    var generator = require('../generator.js');
    var Dialog = require('../Dialog/');
    var selector = require('../../core/dom/selector.js');
    var attribute = require('../../core/dom/attribute.js');
    var modification = require('../../core/dom/modification.js');
    var event = require('../../core/event/touch.js');
    var Template = require('../../libs/Template.js');
    var templateWrap = require('html!./wrap.html');
    var templateLoading = require('html!./loading.html');
    var style = require('css!./style.css');
    var dato = require('../../util/dato.js');
    var tplWrap = new Template(templateWrap);
    var tplLoading = new Template(templateLoading);
    var alienClass = 'alien-ui-imgview';
    var defaults = {
        loading: {
            src: 'http://s.ydr.me/p/i/loading.gif',
            width: 16,
            height: 16,
            text: '加载中……'
        }
    };
    var Imgview = generator({
        constructor: function (options) {
            var the = this;

            the._options = dato.extend({}, defaults, options);
            the._init();
        },

        /**
         * 初始化
         * @private
         */
        _init: function () {
            var the = this;

            the._initNode();
            the._initDialog();
            the._initEvent();
        },


        /**
         * 初始化节点
         * @private
         */
        _initNode: function () {
            var the = this;
            var htmlWrap = tplWrap.render({});
            var htmlLoading = tplLoading.render(the._options);
            var nodeWrap = modification.parse(htmlWrap)[0];
            var nodeLoading = modification.parse(htmlLoading)[0];

            modification.insert(nodeWrap, document.body, 'beforeend');
            the._$ele = nodeWrap;
            the._$loading = nodeLoading;
        },


        /**
         * 初始化对话框
         * @private
         */
        _initDialog: function () {
            var the = this;
            var onclose = function () {
                this.close();
                return false;
            };

            the._dialogOptions = {
                title: null,
                addClass: alienClass + '-dialog'
            };
            the._dialog = new Dialog(the._$ele, the._dialogOptions);

            // 单击背景
            the._dialog.on('hitbg', onclose);

            // 按 esc
            the._dialog.on('esc', onclose);
        },


        /**
         * 初始化事件
         * @private
         */
        _initEvent: function () {

        },


        _load: function (callback) {
            var img = new Image();
            var the = this;

            img.src = the._list[the._index];

            if (img.complete) {
                callback(null, {
                    $img: img,
                    width: img.width,
                    height: img.height
                });
            } else {
                img.onload = function () {
                    callback(null, {
                        $img: img,
                        width: img.width,
                        height: img.height
                    });
                };
                img.onerror = callback;
            }
        },


        /**
         * 展示
         * @private
         */
        _show: function () {
            var the = this;

            the._$ele.innerHTML = '';
            modification.insert(the._$loading, the._$ele, 'beforeend');
            the._dialog.resize();
            the._load(function (err, info) {
                if (err) {
                    return the.emit('error', err);
                }


            });
        },


        /**
         * 打开图片查看器
         * @param list {Array} 图片列表
         * @param [index] {Number} 打开时显示的图片索引
         */
        open: function (list, index) {
            var the = this;

            the._list = list;
            the._index = index || 0;
            the._dialog.open();
            the._show();
        },


        close: function () {

        }
    });

    modification.importStyle(style);
    module.exports = Imgview;
});