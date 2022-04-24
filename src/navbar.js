$(".sidebar-dropdown > a").click(function() {
    $(".sidebar-submenu").slideUp(200);
    if (
      $(this)
        .parent()
        .hasClass("active")
    ) {
      $(".sidebar-dropdown").removeClass("active");
      $(this)
        .parent()
        .removeClass("active");
    } else {
      $(".sidebar-dropdown").removeClass("active");
      $(this)
        .next(".sidebar-submenu")
        .slideDown(200);
      $(this)
        .parent()
        .addClass("active");
    }
  });

  $("#close-sidebar").click(function() {
    $(".page-wrapper").removeClass("toggled");
  });
  $(".sidebar-sub-wrapper #close-sidebar").click(function() {
    $(".sidebar-sub-wrapper").removeClass("active");
  });
  $("#show-sidebar").click(function() {
    $(".page-wrapper").addClass("toggled");
  });

  // policy data 
  var policyData = {
    "Version": "2012-10-17",
    "Statement": [{
        "Effect": "Allow",
        "Action": [
            "apigateway:GET",
            "autoscaling:DescribeAutoScalingGroups",
            "autoscaling:DescribeLaunchConfigurations",
            "cloudfront:ListDistributions",
            "cloudfront:ListTagsForResource",
            "cloudtrail:DescribeTrails",
            "cloudtrail:ListTags",
            "cloudtrail:ListTrails",
            "dynamodb:DescribeTable",
            "dynamodb:ListTables",
            "dynamodb:ListTagsOfResource",
            "ec2:DescribeCustomerGateways",
            "ec2:DescribeInstances",
            "ec2:DescribeInternetGateways",
            "ec2:DescribeNatGateways",
            "ec2:DescribeNetworkAcls",
            "ec2:DescribeNetworkInterfaces",
            "ec2:DescribeRouteTables",
            "ec2:DescribeSecurityGroups",
            "ec2:DescribeSubnets",
            "ec2:DescribeTransitGateways",
            "ec2:DescribeTransitGatewayAttachments",
            "ec2:DescribeTransitGatewayRouteTables",
            "ec2:DescribeVolumes",
            "ec2:DescribeVpcs",
            "ec2:DescribeVpcEndpoints",
            "ec2:DescribeVpcEndpointConnections",
            "ec2:DescribeVpnConnections",
            "ec2:DescribeVpnGateways",
            "ec2:DescribeVpcPeeringConnections",
            "ec2:SearchTransitGatewayRoutes",
            "ecs:DescribeClusters",
            "ecs:DescribeServices",
            "ecs:DescribeTasks",
            "ecs:ListClusters",
            "ecs:ListServices",
            "ecs:ListTasks",
            "eks:DescribeCluster",
            "eks:ListClusters",
            "elasticfilesystem:DescribeFileSystems",
            "elasticache:DescribeCacheClusters",
            "elasticache:DescribeCacheSubnetGroups",
            "elasticloadbalancing:DescribeLoadBalancers",
            "elasticloadbalancing:DescribeTags",
            "elasticloadbalancing:DescribeTargetGroups",
            "elasticloadbalancing:DescribeTargetHealth",
            "emr:DescribeClusters",
            "emr:ListClusters",
            "es:DescribeElasticsearchDomains",
            "es:ListDomainNames",
            "es:ListTags",
            "firehose:DescribeDeliveryStream",
            "firehose:ListDeliveryStreams",
            "firehose:ListTagsForDeliveryStream",
            "glacier:DescribeVault",
            "glacier:ListVaults",
            "iam:ListAccountAliases",
            "kinesis:DescribeStream",
            "kinesis:ListShards",
            "kinesis:ListStreams",
            "kinesis:ListTagsForStream",
            "lambda:ListFunctions",
            "lambda:ListTags",
            "network-firewall:ListFirewalls",
            "network-firewall:DescribeFirewall",
            "redshift:DescribeClusters",
            "rds:DescribeDBClusters",
            "rds:DescribeDBInstances",
            "rds:ListTagsForResource",
            "route53:ListHostedZones",
            "route53:ListResourceRecordSets",
            "route53:ListTagsForResource",
            "s3:GetBucketLocation",
            "s3:GetBucketNotification",
            "s3:GetBucketPolicyStatus",
            "s3:GetBucketTagging",
            "s3:GetEncryptionConfiguration",
            "s3:ListAllMyBuckets",
            "sns:GetTopicAttributes",
            "sns:ListTopics",
            "sns:ListTagsForResource",
            "sqs:GetQueueAttributes",
            "sqs:ListQueues",
            "sqs:ListQueueTags",
            "states:DescribeActivity",
            "states:ListActivities",
            "states:DescribeStateMachine",
            "states:ListStateMachines",
            "states:ListTagsForResource",
            "sts:GetCallerIdentity"
        ],
        "Resource": ["*"]
    }]
}

var textedJson = JSON.stringify(policyData, undefined, 4);
$('#policy-area-text').text(textedJson);


// timeout
let timeout;

$("#import-finish").click(function() {
  setTimeShowup();
});

$("#close-modal").click(function() {
  clearTimeout(timeout);
})

function setTimeShowup() {
  timeout = setTimeout(finishFunc, 10000);
  timeout;
}

function finishFunc() {
  $(".loading").hide()
  $(".finsh-madal").show();
}

// 
$('body').on("click", ".dropdown-region-menu", function (e) {
  $(this).parent().is(".open") && e.stopPropagation();
});

$('.selectall').click(function() {
  if ($(this).is(':checked')) {
      $('.option').prop('checked', true);
      var total = $('input[name="options[]"]:checked').length;
      $(".dropdown-text").html('(' + total + ') Selected');
      $(".select-text").html(' Deselect');
  } else {
      $('.option').prop('checked', false);
      $(".dropdown-text").html('(0) Selected');
      $(".select-text").html(' Select');
  }
});

$("input[type='checkbox'].justone").change(function(){
  var a = $("input[type='checkbox'].justone");
  if(a.length == a.filter(":checked").length){
      $('.selectall').prop('checked', true);
      $(".select-text").html(' Deselect');
  }
  else {
      $('.selectall').prop('checked', false);
      $(".select-text").html(' Select');
  }
var total = $('input[name="options[]"]:checked').length;
$(".dropdown-text").html('(' + total + ') Selected');
});


