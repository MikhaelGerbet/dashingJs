![DashingJS: The open source AngularJS based framework that lets you build beautiful dashboards. ](../../../.github/header.png)

# Date Widget

###### With Date Widget, display the current date and time on your awesome dashboard !

**Table of contents**

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Preview](#preview)
- [Parameters](#parameters)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Preview

![DashingJS: The open source AngularJS based framework that lets you build beautiful dashboards. ](.github/widget-date.png)


## Parameters

> These settings are configurable in your config file

`./app/scripts/config.js`

|name|type|default|require|description|
|:---:|:---:|:---:|:---:|:---:|
|clock|boolean|true|true|_Show time_|
|date|boolean|true|true|_Show date_|

_config exemple :_

```js
var config = {
    items : {
        { sizeX : 1, sizeY : 1, row : 0, col : 1, background : '#ec663c', icon : 'clock-o', widget : 'date', params : {date : true, clock : true}},
    }
}
```