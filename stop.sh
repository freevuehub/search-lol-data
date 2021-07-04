kill -9 `netstat -tnlp | grep 19974 | gawk '{ print $7 }' | grep -o '[0-9]*'`
