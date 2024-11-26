__html_vars__ = {};

// EXAMPLE
// yohGet("/api").then(json => {console.log(json)});
async function yohGet(url) { // easier json get request
    try {
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error fetching ${url}: ${response.statusText}`);
        }
    return response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

// EXAMPLE
// yohPost("/api_endpoint", JSON.stringify({value: "test"}));
function yohPost(url, payload) { // easier post request
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: payload,
    })
    .then((response) => response.json())
    .then((data) => {
        // Handle the response data
        console.log(data);
    })
    .catch((error) => {
        // Handle errors
        console.error("Error:", error);
    });
}

function yohRange(min, max){ // array containing range of numbers
    let temparr = [];
    max = max || min;
    if (min === max){
        min = 0;
    }
    for (let i = min; i < max; i++) {
        temparr.push(i);
    }
    return temparr;
}

function soft_html_insert(key, value){ // insert html var without updating the page
    __html_vars__[key] = value;
}

function update_vars(){ // it's in the name
    var var_tags = document.getElementsByTagName("v");
    for (let html_var of var_tags) {
        let requested = html_var.id;
        html_var.innerHTML = __html_vars__[requested];
    }
}


function html_insert(key, value){ // insert value to html vars and update page contents
    // update insertion and variables
    __html_vars__[key] = value;
    var var_tags = document.getElementsByTagName("v");
    for (let html_var of var_tags) {
        let requested = html_var.id;
        html_var.innerHTML = __html_vars__[requested];
    }
    
    var for_tags = document.getElementsByTagName("for");
    for (let for_tag of for_tags) {
        let loop = for_tag.getAttribute('loop')
        let splitLoop = loop.split(" ");
        const varname = splitLoop[0];
        const varname_0 = splitLoop[0] + "__0";
        const keyword = splitLoop[1];
        const existingVar = splitLoop[2];
        if (keyword !== "in"){
            console.error("YOH LOOP ERROR: loop method not allowed. For now, use \"in\" keyword.")
        } else{
            try{
                const existingVarValue = __html_vars__[existingVar];
                if (existingVarValue.length > 0){
                    var counter = 0;
                    var tempdiv = document.createElement("div");
                    existingVarValue.forEach(value => {
                        let temp_name = varname + "__" + counter;
                        var divs = 0;
                        soft_html_insert(temp_name, value);
                        const loop_children = for_tag.children;
                        for (let loop_child of loop_children){
                            if (loop_child.tagName === "DIV"){
                                if (divs < 1){
                                    divs ++;
                                    var copied = loop_child.cloneNode(true);
                                    var copied_children = copied.querySelectorAll("*");
                                    copied_children.forEach(copied_child => {
                                        if (copied_child.id === varname || copied_child.id === varname_0){
                                            copied_child.id = temp_name;
                                        }
                                    });
                                    // for_tag.appendChild(copied);
                                    tempdiv.appendChild(copied);
                                }
                            }
                        }
                        counter ++;
                    });
                    for_tag.innerHTML = tempdiv.innerHTML;
                    update_vars();
                } else{
                    console.error("YOH LOOP ERROR: " + '"' + existingVar + '"' + " was of length 0 upon " + '"' + key + '"' + " insertion.")
                }
            } catch (error){ // goob
                console.error("YOH LOOP ERROR: " + '"' + existingVar + '"' + " likely did not exist upon " + '"' + key + '"' + " insertion.")
                console.error("CORRESPONDING JS ERROR: " + error);
            }
        }
    }
}
