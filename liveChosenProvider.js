/**
 * Created by danny.xie on 2016/8/23.
 */
angular.module('live.provider.liveChosen',[]).
    provider('liveChosen',function(){
    var config={
        title:''
    }
    this.configLiveChosen=function(inputObj){
        angular.extend(config,inputObj);
    }
    this.$get=['$rootScope','$ionicModal','$timeout','$ionicScrollDelegate','$ionicBackdrop','$rootScope',function($rootScope,$ionicModal,$timeout,$ionicScrollDelegate,$ionicBackdrop,$rootScope){
        var provider={};
        var $scope=$rootScope.$new();
        // var selectedIndex={
        //     main:0,
        //     child:0
        // };

        $ionicModal.fromTemplateUrl('./js/directive/liveChosen/liveChosenModal.html', {
            scope: $scope,
            animation: 'slide-in-up',
            backdropClickToClose:false
        }).then(function (modal) {
            $scope.modal = modal;
        });

        $scope.$on('$destroy', function () {
            $scope.modal.remove();
        });

        var openModal=function() {
            $timeout(function(){
                $scope.modal.show();
                $('.modal-backdrop').css('z-index','999');
            })

        }

        var closeModal=function() {
            $scope.modal.hide();
            if($scope.mainObj.cancel) {
                $scope.mainObj.cancel();
            }
        }

        $scope.backdropToClose=function ($event) {
            if($event.target.nodeName=='ION-MODAL-VIEW'){
                closeModal();
            }
        }
        $scope.closeModal=function () {
            closeModal();
        }
        $scope.tapList=function(mainIndex,childIndex){
            if($scope.mainList[mainIndex].id) {
                // $scope.mainList[selectedIndex.main].active = false;
                // if ($scope.mainList[selectedIndex.main].list) {
                //     $scope.mainList[selectedIndex.main].list[selectedIndex.child].active = false;
                // }
                // selectedIndex.main = mainIndex;
                // $scope.mainList[mainIndex].active = true;

                // if (childIndex!=undefined) {
                //     selectedIndex.child = childIndex;
                //     $scope.mainList[mainIndex].list[childIndex].active = true;
                //     $scope.mainObj.callback([$scope.mainList[mainIndex],$scope.mainList[mainIndex].list[childIndex]]);
                //     $timeout(function(){
                //         closeModal();
                //     },300)
                //  }else {
                //     selectedIndex.child = 0;
                // }
                // if(!$scope.mainList[mainIndex].list){
                //     if($scope.mainObj.hasCommit) {
                //         $scope.mainObj.callback({
                //             type:'click',
                //             data:[$scope.mainList[mainIndex]]
                //         });
                //     }else{
                //         $scope.mainObj.callback([$scope.mainList[mainIndex]]);
                //         $timeout(function () {
                //             closeModal();
                //         }, 300)
                //     }
                // }
                if(!$scope.mainObj.multiple){
                    var selectedArr=[]
                    if(mainIndex!=undefined&&childIndex==undefined&&$scope.mainList[mainIndex].list){
                         for(var i=0;i<$scope.mainList.length;i++){
                            if(i==mainIndex){
                                selectedArr.push($scope.mainList[i])
                                $scope.mainList[i].active=true
                            }else{
                                $scope.mainList[i].active=false
                            } 
                        }
                        return;
                    }else if(mainIndex!=undefined&&childIndex!=undefined&&$scope.mainList[mainIndex].list){
                        selectedArr=[
                        $scope.mainList[mainIndex],$scope.mainList[mainIndex].list[childIndex]
                        ] 
                    }else{
                         for(var i=0;i<$scope.mainList.length;i++){
                            if(i==mainIndex){
                                selectedArr.push($scope.mainList[i])
                                $scope.mainList[i].active=true
                            }else{
                                $scope.mainList[i].active=false
                            }
                            if($scope.mainList[i].list){
                                for(var k=0;k<$scope.mainList[i].list.length;k++){
                                    if(k==childIndex){
                                        selectedArr.push($scope.mainList[i].list[k])
                                        $scope.mainList[i].active=true
                                    }else{
                                        $scope.mainList[i].active=false
                                    }
                                }
                            }
                        }
                    }
                }else{ 
                    if($scope.mainList[mainIndex].id==''||$scope.mainList[mainIndex].name=='不限'||$scope.mainList[mainIndex].name=='全部'){
                        for(var i=0;i<$scope.mainList.length;i++){
                            $scope.mainList[i].active=false
                        }
                        $scope.mainList[mainIndex].active=true; 
                    }else{ 
                        if($scope.mainList[0].id==''||$scope.mainList[0].name=='不限'||$scope.mainList[0].name=='全部'){
                            $scope.mainList[0].active=false;
                        }
                        for(var i=0;i<$scope.mainList.length;i++){
                            if(i==mainIndex){

                                $scope.mainList[i].active=!$scope.mainList[i].active
                            }
                            if($scope.mainList[i].list){
                                for(var k=0;k<$scope.mainList[i].list.length;k++){
                                    if(k==childIndex){ 
                                        $scope.mainList[i].active=!$scope.mainList[i].active
                                    } 
                                }
                            }
                        }
                    } 
                }
                if($scope.mainObj.multiple) {
                         
                }else if(!$scope.mainObj.multiple&&$scope.mainObj.hasCommit){
                        $scope.mainObj.callback({
                            type:'click',
                            data:selectedArr
                        });
                }else{
                    $scope.mainObj.callback(selectedArr);
                    $timeout(function () {
                        closeModal();
                    }, 300)
                }
                var scroll;
                angular.forEach($ionicScrollDelegate._instances, function (s) {
                    if (s.$$delegateHandle === "chosen") {
                        scroll = s;
                    }
                });
                scroll.resize();
            }
        };
        var listener_msg=$rootScope.$on('liveChosen.msg',function (e,msg) {
            $scope.checkMsg=msg;
        })
        $scope.commit=function () {
            var selectedArr=[]
            for(var i=0;i<$scope.mainList.length;i++){
                if($scope.mainList[i].active){
                    selectedArr.push($scope.mainList[i]) 
                } 
                if($scope.mainList[i].list){
                    for(var k=0;k<$scope.mainList[i].list.length;k++){
                        if($scope.mainList[i].list[k].active){
                            selectedArr.push($scope.mainList[i].list[k])
                             
                        } 
                    }
                }
            }
            $scope.mainObj.callback({
                type:'commit',
                data:selectedArr
            });
            $timeout(function () {
                closeModal();
            }, 300)
        }
        $scope.isActionSheet=true;
        provider.openChosen=function(ipObj){
            $scope.checkMsg='';
            // selectedIndex={
            //     main:0,
            //     child:0
            // };
            if(ipObj.list){
                if(ipObj.group){
                    $scope.mainList=groupData(ipObj.list);
                    delete  ipObj.list;
                }else{
                    $scope.mainList=ipObj.list;
                    // delete  ipObj.list;
                }

            }
            // for(var i=0;i<$scope.mainList.length;i++){
            //     if($scope.mainList[i]["active"]){
            //         selectedIndex.main=i;
            //     }
            // }
            $scope.mainObj = angular.extend({}, config, ipObj);
            var scroll;
            angular.forEach($ionicScrollDelegate._instances, function (s) {
                if (s.$$delegateHandle === "chosen") {
                    scroll = s;
                }
            });
            if($scope.mainObj.type=='actionSheet'){
                scroll.getScrollView().freeze(true);
            }else{
                scroll.getScrollView().freeze(false);
            }
            openModal();
        }
        // $scope.$on("$destroy", function() {
        //     //清除配置,不然scroll会重复请求
        //     listener_msg=null;
        // })

        return provider;
    }]
});