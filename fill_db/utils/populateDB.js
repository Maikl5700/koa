module.exports = {

    books: ( array, connection ) => {
        return new Promise((resolve, reject) => {

            let start_str = "INSERT INTO books (title, description, image, date) VALUES "
            let str = start_str
            let succInserts = 0

            for(let i = 0; i < array.length; i++){


                const el = array[i]
                str += `('${el.title}', '${el.description}', '${el.image}', '${el.date}'),`

                // INSERT EVERY 1000 ROWS
                if (i > 0 && (i + 1) % 1000 == 0){
                    str = str.slice(0, -1)
                    connection.query(str, function (error, results, fields) {
                        if (error) reject(error);
                        succInserts++

                        if(succInserts == (array.length / 1000)) {
                            resolve('ok')
                        }                       
                    });

                    str = start_str
                }
            }
        });
    },

    authors: (array, connection) => {
        return new Promise((resolve, reject) => {

            let start_str = "INSERT INTO authors (name) VALUES "
            let str = start_str
            let succInserts = 0

            for (let i = 0; i < array.length; i++) {


                const el = array[i]
                // console.log(el.description.length)
                str += `("${el.name}"),`

                // INSERT EVERY 1000 ROWS
                if (i > 0 && (i + 1) % 10000 == 0) {
                    str = str.slice(0, -1)
                    connection.query(str, function (error, results, fields) {
                        if (error) { console.log(i);reject(error)};
                        succInserts++

                        if (succInserts == (array.length / 10000)) {
                            resolve('ok')
                        }
                    });

                    str = start_str
                }
            }
        });
    },

    books_authors: ( array, connection ) => {
        return new Promise((resolve, reject) => {


            let start_str = "INSERT INTO authors_books (author_id, book_id) VALUES "
            let str = start_str
            let succInserts = 0

            for(let i = 0; i < array.length; i++){
                const el = array[i]
                el.authors.forEach(author_id => {
                    str += `('${el.id}', '${author_id}'),`
                })

                // INSERT PARTIAL
                if (i > 0 && (i + 1) % 1000 == 0){
                    str = str.slice(0, -1)
                    connection.query(str, function (error, results, fields) {
                        if (error) reject(error)
                        succInserts++

                        if(succInserts == (array.length / 1000)) {
                            resolve('ok')
                        }                       
                    });

                    str = start_str
                }
            }
        });
    },  
}