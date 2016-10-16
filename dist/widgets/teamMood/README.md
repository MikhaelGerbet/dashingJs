![DashingJS: The open source AngularJS based framework that lets you build beautiful dashboards. ](../../../.github/header.png)

# TeamMood Widget

###### With TeamMood Widget, display the current Team Mood by team on your awesome dashboard !

**Table of contents**

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Preview](#preview)
- [Parameters](#parameters)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Preview

![DashingJS: The open source AngularJS based framework that lets you build beautiful dashboards. ](.github/widget-teamMood.png)


## About Team Mood


Managers, do you (really) know how your team is doing? 
With TeamMood, track the well-being of your team, easily.

[www.teammood.com](http://www.teammood.com/?utm_source=dashingjs&utm_medium=github&utm_campaign=dashingjs)


## Parameters

> These settings are configurable in your config file

`./app/config.js`

|name|type|default|require|description|
|:---:|:---:|:---:|:---:|:---:|
|token|string|true|true|_Team Mood API token_|

_config exemple :_

```js
var config = {
    items : {
        { sizeX : 1, sizeY : 1, row : 1, col : 4, background : '#00A86A', icon : null, widget : 'teamMood', params : {token:'_YOUR_TEAMMOOD_API_TOKEN_'}},
    }
}
```