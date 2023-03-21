import time
from datetime import datetime


class TimeFormat:
    def __init__(self, timestamp) -> None:
        self.timestamp = timestamp
        self.currentTimeStamp = time.time()
    
    def getTimeSpan(self) -> str:
        """
        Return the number of hour pass
        :return: int
        """
        currentTimeStampPointer = datetime.fromtimestamp(self.currentTimeStamp)
        timestampPointer = datetime.fromtimestamp(self.timestamp)

        timestampDate = timestampPointer.date()
        currentDate = currentTimeStampPointer.date()
        dateDelta = currentDate - timestampDate
        delta = currentTimeStampPointer - timestampPointer
        hourPass = delta.seconds // 3600
        minutesPass = delta.seconds // 60
        daysPass = delta.days
        monthsPass = daysPass // 30
        yearsPass = monthsPass // 12

        if minutesPass < 1:
            timespan = "Less than a minute"
        else:
            timespan = f"{minutesPass} minutes"
        
        if hourPass != 0:
            timespan = f"{hourPass}h"
        
        if daysPass != 0:
            timespan = f"{daysPass}d"
        
        if monthsPass != 0:
            timespan = f"{monthsPass}m"
        
        if yearsPass != 0:
            timespan = f"{yearsPass}y"
        return timespan
