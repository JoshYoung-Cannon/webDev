// let x = function() {console.log("a")};
// let run = function(func, num){
//     for (let i=0;i<num;i++){
//         console.log(i);
//     }
//     func();
// }

// run(x,1000)
let request = new XMLHttpRequest();
request.open("GET","http://localhost:8081/note/");
request.send();
console.log(request.response);
request.onload = () => {
    console.log(request.response);
};  

let requestHandler = (method, url, callback) => {
    let request = new XMLHttpRequest();
    request.open(method,url);
    request.send();
    console.log(request.response);
    request.onload = () => {
        callback(request.response);
    };  
}

let requestHandler1 = (method, url) => {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open(method,url);
        request.send();
        request.onload = () => {
            if (request.status >= 200 && request.status < 300){
                resolve(request);
            }
            else {
                reject("Status code: " + request.status);
            }
        }
    }
    );
};

let display = (data) => {
    console.log(data);
}

requestHandler("GET", "http://localhost:8081/note/", display);
requestHandler1("PUT", "http://localhost:8081/note/")
    .then((request) => {
        console.log(request.response)
    })
    .catch((error) => {
        console.log(error);
    });


// async function hello() {
//     let request = await requestHandler1("PUT", "http://localhost:8081/note/");
//     console.log(request.response);
// }
// hello();

// fetch("http://localhost:8081/note/") 
//    .then(request => request.json() )
//    .then(request => console.log(request));

class Dog {
   constructor(name, age) {
       this.name = name;
       this.age = age;
    }
   bark() {
        console.log("woof");
    }
}
let dog = new Dog();
console.log(dog.name);