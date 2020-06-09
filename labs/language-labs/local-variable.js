function Counter() {
    cnt = 0
    function inc() {
        cnt = -10
        console.log(cnt)
        cnt = cnt + 1
        return cnt
    }
    return inc
}

inc = Counter()
inc()
console.log(inc())
