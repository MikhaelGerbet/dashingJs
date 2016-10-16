
/**
 * handles the behaviour of flipping card.
 */
angular.module('angular-flipper', []).directive('flipperContainer', function ($interval) {
    return {
        restrict: 'C',
        scope: {
            interval: '@'
        },
        link: function link(scope, element, attrs) {
            scope.isHover = false;
            $interval(function(){
                scope.isHover = !scope.isHover;
                if(scope.isHover){
                    $(element).parent().addClass('flipperMode');
                    $(element).addClass('hover');
                }else{
                    $(element).removeClass('hover');
                    setTimeout(function(){
                        $(element).parent().removeClass('flipperMode');
                    },700);
                }
            }, scope.interval);
        }
    };
});