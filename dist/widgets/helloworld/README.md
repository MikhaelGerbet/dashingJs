![DashingJS: The open source AngularJS based framework that lets you build beautiful dashboards. ](../../../.github/header.png)

# Helloworld Widget

###### Helloworld Widget is a simple exemple of widget for your custom developpement.

**Table of contents**

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Preview](#preview)
- [Parameters](#parameters)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Preview

![DashingJS: The open source AngularJS based framework that lets you build beautiful dashboards. ](.github/widget-helloworld.png)


## Parameters

> These settings are configurable in your config file

`./app/config.js`

|name|type|default|require|description|
|:---:|:---:|:---:|:---:|:---:|
|message|string|hello world|false|_Message to display_|

_config exemple :_

```js
var config = {
    items : [
        {
            sizeX : 1,
            sizeY : 1,
            row : 0,
            col : 1,
            background : '#ec663c',
            icon : null,
            widget : 'helloworld',
            params : {
                message : 'Gryffindor always',
                clock : true
            }
        }
    ]
}
```