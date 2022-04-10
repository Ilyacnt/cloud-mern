export default size => {
    switch (true) {
        case size > 1024*1024*1024:
            return (size/(1024*1024*1024)).toFixed(1) + 'Gb'
        case size > 1024*1024:
            return (size/(1024*1024)).toFixed(1) + 'Mb'
        case size > 1024:
            return (size/(1024)).toFixed(1) + 'Kb'
        default:
            return size + 'B'
    }
}