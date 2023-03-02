import time
from datetime import datetime


class TimeFormat:
    def __init__(self, timestamp) -> None:
        self.timestamp = timestamp
        self.currentTimeStamp = time.time()
    
    def getTimeDifference(self):
        currentTimeStampPointer = datetime.fromtimestamp(self.currentTimeStamp)
        timestampPointer = datetime.fromtimestamp(self.timestamp)

        currentDate = currentTimeStampPointer.date()
        timestampDate = timestampPointer.date()
        delta = currentDate - timestampDate
        hourPass = delta.seconds // 3600
