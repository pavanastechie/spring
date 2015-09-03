'use strict';

angular.module('policyAdminApp')
    .factory('policyService', function($http, $q, entitlementsService, $rootScope, $log) {
        var _currPolicyId = '',
            _currPolicies = '',
            _constraintTypes = '';
        return {

            setCurrentPolicyId: function(policyId) {
                _currPolicyId = policyId;
            },

            getCurrentPolicyId: function() {
                return _currPolicyId;
            },

            getCurrentAppPolicies: function() {
                return _currPolicies;
            },

            setCurrentAppPolicies: function(currPolicies) {
                _currPolicies = currPolicies;
            },

            getPolicyById: function(policyId) {
                var deferred = $q.defer(),
                    url;
                if ($rootScope.dev) {
                    url = entitlementsService.url.getPolicy;
                } else {
                    url = entitlementsService.url.getPolicy + '/' + policyId;
                }
                $http.get(url).success(function(data) {
                    $log.debug('Returning JSON data for policy Id ', policyId, data);
                    deferred.resolve(data);
                }).error(function() {
                    deferred.reject('There was an error');
                });
                // Added the below code to test the APi in dev environment
                if ($rootScope.dev) {
                    $http.get(entitlementsService.url.getPoliciesByApp).success(function(data) {
                        $log.debug('Returning JSON data for policy Id ', policyId);
                        data.forEach(function(policy) {
                            if (policy._id === _currPolicyId) {
                                deferred.resolve(policy);
                                return true;
                            }
                        });
                    });
                }
                return deferred.promise;

            },

            getPoliciesByAppId: function(appId) {
                var deferred = $q.defer(),
                    url;

                if (!appId) {
                    $log.debug('App Id is empty while invoking getPoliciesByAppId');
                    deferred.reject('There was an error');
                }

                if ($rootScope.dev) {
                    url = entitlementsService.url.getPoliciesByApp;
                } else {
                    url = entitlementsService.url.getPoliciesByApp + '/' + appId + '/policies';
                }

                $http.get(url).success(function(data) {
                    $log.debug('Returning JSON data for PoliciesByAppId ', appId, data);
                    deferred.resolve(data);
                }).error(function() {
                    deferred.reject('There was an error');
                });

                return deferred.promise;
            },

            submitCreatePolicy: function(policyDetail, update) {
                var deferred = $q.defer();

                $http({
                    url: entitlementsService.url.createPolicy,
                    dataType: 'json',
                    method: update ? 'POST' : 'PUT',
                    data: policyDetail
                }).success(function() {
                    $log.debug('Policy Created Successfully');
                    deferred.resolve('Policy Created Successfully');
                }).error(function() {
                    deferred.reject('There was an error');
                    $log.debug('policy could not be created');
                });
                return deferred.promise;
            },

            getConstraintTypes: function() {
                var deferred = $q.defer();
                // retrive this data only once
                if (_constraintTypes) {
                    deferred.resolve(_constraintTypes);
                }
                $http.get(entitlementsService.url.getConstraintTypes).success(function(data) {
                    _constraintTypes = data;
                    deferred.resolve(data);
                }).error(function() {
                    deferred.reject('There was an error');
                });

                return deferred.promise;
            },

            removePolicy: function(policyId) {
                var deferred = $q.defer(),
                    url;

                if ($rootScope.dev) {
                    url = entitlementsService.url.removePolicy;
                } else {
                    url = entitlementsService.url.removePolicy + '/' + policyId;
                }

                $http({
                    url: url,
                    dataType: 'json',
                    method: 'DELETE'
                }).success(function(data) {
                    deferred.resolve(data);
                }).error(function() {
                    deferred.reject('There was an error');
                });
                return deferred.promise;
            }
        };
    });