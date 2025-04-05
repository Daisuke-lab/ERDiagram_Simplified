import json
import boto3
from datetime import datetime
import pytz


ASG_NAME = 'er-diagram-asg'
def confirm_permission(client):
    response = client.describe_auto_scaling_groups(
    AutoScalingGroupNames=[ASG_NAME],
    )
    asgs = response['AutoScalingGroups']
    return len(asgs) > 0    


def set_desired_capacity(client, capacity):
    print("Setting desired capacity to: ", capacity)
    response = client.set_desired_capacity(
        AutoScalingGroupName=ASG_NAME,
        DesiredCapacity=capacity,
        HonorCooldown=False)

def calc_desired_capacity():
    timezone_str = 'America/Chicago' 
    timezone = pytz.timezone(timezone_str)
    now = datetime.now(timezone)
    return 1 if (8 <= now.hour and now.hour <= 17) else 0

def lambda_handler(event, context):
    # TODO implement
    client = boto3.client('autoscaling')
    confirm_permission(client)
    capacity = calc_desired_capacity()
    set_desired_capacity(client, capacity)


    

    
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }
