axios.get('http://localhost:4000/schools')
                .then(response => {
                    window.location = '/showresult';
                })
             .catch(function(error) {
                 console.log(error);
             })
            // alert(this.state.region + " " + this.state.search);
            // this.setState({
            //     response: this.state.region + ":" + this.state.search
            // })
        }

        axios.get('http://localhost:4000/schools')
        .then(response => {
            window.location = '/showresult';
        })
     .catch(function(error) {
         console.log(error);
     })
    // alert(this.state.region + " " + this.state.search);
    // this.setState({
    //     response: this.state.region + ":" + this.state.search
    // })
}