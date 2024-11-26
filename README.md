# Introduction
Yoh is a project designed to make front-end development with JS and CSS easier. Though extremely minimal,
Yoh provides trivial DOM manipulation, and simplified methods for GET and POST requests using json.
While yoh is not done, it's primary features are complete.

# Getting Started
The quickest way to include yoh into your project is to add the following lines of code to the top of your project.

``` html
<link rel="stylesheet" href="https://nahcrof.com/yoh/yoh.css">
<script src="https://nahcrof.com/yoh/yoh.js"></script>
```
If you don't like using the files stored somewhere else, simply install them and pull them from your project.

Please note that all JS you write using yoh, should be at the bottom of your file, and yoh itself should be at the top. 

# Docs
## yoh.js
### DOM manipulation using for loops
In yoh, if you want to create an element and programatically add a list of elements to it, you can do so using the "for" tag. The following code is an example of this.
``` html
<for loop="element in elements">
    <div>
        this is element: <v id="element"></v> 
    </div>
</for>
<script>
    html_insert("elements", yohRange(0, 10)); // insert "elements" into html vars and create an array range 0-10
    // ALTERNATIVE: html_insert("elements", yohRange(10));
</script>
```
HTML OUTPUT:
```
this is element: 0
this is element: 1
this is element: 2
this is element: 3
this is element: 4
this is element: 5
this is element: 6
this is element: 7
this is element: 8
this is element: 9
```
In the listed example, JS defines an array named "elements". This array is stored in a list of html variables and all variables (v tags) are updated upon insertion. Let's look at a simpler example.
### HTML Variables
In yoh, variables can be stored for html insertion using the "html_insert" function and the "<v>" tag. Here is a very simple example.
``` html
<v id="myVar"></v>
<script>html_insert("myVar", "test")</script>
```
HTML OUTPUT
```
test
```
In the example, an html variable named "myVar" is created and then inserted into the v tag with the corresponding id.
As for the loop example, the loop looks for each "element" within the html variable "elements". For each iteration, it copies the contents of the for loop's data and
replaces all instances of the local variable with their current value. Just a for loop in--basically--html.
### Fetch alternatives in yoh
Yoh has a way of fetching json with a get request, and a way of posting json data. Here is an extremely basic example of each. <br>
yohGet:
``` js
yohGet("/api").then(json => {console.log(json)});
```
yohPost
``` js
yohPost("/api_endpoint", JSON.stringify({value: "test"}));
```
These work as expected, yohGet returns a json object literal containing the data from the server. yohPost returns whatever is sent back from the server after the POST request is made
## yoh.css
At this point, yoh.css contains only the class ".fade-in". This class will cause it's element to apply a fade-in animation lasting 3 seconds.<br><br>
With all that, this is the end of the docs. All that is left to add, is a delete and put request such as "yohDelete" and "yohPush" and a few more basic css elements. The project will remain under a total of 400 lines of code.
