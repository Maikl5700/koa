function generateBooks(count) {

    // GENERATE ARRAY
    let array = []
    console.time("GENERATION");
    for (let index = 0; index < count; index++) {

        let title = faker.lorem.sentence(3, 8)
        
        if (title.length >= 30) {
            title = title.substring(0, 30)
        }

        array.push({
            title: title,
            description: faker.lorem.text(30),
            image: faker.image.imageUrl(),
            date: casual.date(format = 'YYYY-MM-DD') 
        })
    }
    console.timeEnd("GENERATION");



    // GET UNIQUE ARRAY 
    array = _.uniqBy(array, 'title'); 
    array.length = 100000

    return array
    // console.log('RECORDING')
    // fs.writeFile("./data/", JSON.stringify(array), function (err) {

    //     if (err) {
    //         return console.log(err);
    //     }

    //     console.log("The file was saved!");
    // });

}

function generateAuthors(count) {

    // GENERATE ARRAY
    let array = []

    console.time("GENERATION");
    for (let index = 0; index < count; index++) {

        let name = faker.name.findName()
        
        if (name.length >= 30) {
            name = name.substring(0, 30)
        }

        array.push({
            name
        })
    }
    console.timeEnd("GENERATION");



    // GET UNIQUE ARRAY 
    array = _.uniqBy(array, 'name');
    // console.log(array.length) 
    array.length = 20000

    return array
    // console.log('RECORDING')
    // fs.writeFile("./data/authors_data.json", JSON.stringify(array), function (err) {

    //     if (err) {
    //         return console.log(err);
    //     }

    //     console.log("The file was saved!");
    // });

}

function generateAuthorsWithoutBooks(){
    let arr = []
    for (let index = 0; index < 20000; index++) {
        arr[index] = {
            index,
            flag: 0
        }
    }

    return arr
}


(async () => {
    const books = await readFile('./data/books_data.json')
    let authors_withoutbooks = generateAuthorsWithoutBooks()
    let authors_books = []

    console.log(books.length)
    console.log(authors_withoutbooks.length)
    // console.log(authors_withoutbooks)
    console.time('a')
    for (let index = 0; index < books.length; index++) {
        let authors_id = []

        for (let i = 0; i < randomWithProbability(); i++) {
            const random_index = Math.ceil(Math.random() * authors_withoutbooks.length) - 1

            authors_id.push(authors_withoutbooks[random_index].index)
            // console.log('B', authors_withoutbooks.length)
            authors_withoutbooks[random_index].flag = 1

        }

        // if(authors_id.length == 0) console.log('123')
        authors_books.push({
            id: index + 1,
            authors: _.union(authors_id)
        })
        authors_id = []
        //console.log(num)
    }
    console.timeEnd('a')
    console.log('OK')
    console.log(authors_withoutbooks.filter((el) => el.flag == 0).length)
    console.log(authors_withoutbooks.length)

    fs.writeFile('./data/books_authors.json', JSON.stringify(authors_books), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
    // console.log(authors_books)
})//()

// const arr = [2,2,2,2,2,3]
// console.log(_.union(arr))

// let one, two, three, four
// let counter = 0

// for (let index = 0; index < books.length; index++) {
//     // const element = books[index];
//     const num = randomWithProbability()
//     if(num == 4) {
//         counter++
//     }
// }



function randomWithProbability() {
    const notRandomNumbers = [1, 1, 1, 1, 2, 2, 2, 3, 3, 4];
    const idx = Math.floor(Math.random() * notRandomNumbers.length);
    return notRandomNumbers[idx];
}
