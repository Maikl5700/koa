class Query {
    constructor(tableName){
        if(!tableName) throw new Error('Table name is required in constructor')

        this.tableName = tableName
        this.action = 'SELECT'
        this.atributes = '*'

        // optional
        this.valuesName = null
        this.values = null
        this.valuesToUpdate = null
        this.where = ''
        this.limit = ''
        this.order = ''
    }
}

// SIMPLE BUILDER PATTERN

class QueryBuilder {
    constructor(tableName) {
        this.query = new Query(tableName)
    }

    
    insert(values) {
        if (!values) throw new Error('Inserted values is required')
        
        const { query } = this

        query.action = 'INSERT INTO'

        if(Array.isArray(values) && values.length) {
            query.valuesName = getValuesName(values[0])
            query.values = getValues(values, true)
        } else if (typeof values === "object" && Object.keys(values).length) {
            query.valuesName = getValuesName(values)
            query.values = getValues(values)
        } else {
            throw new Error('Inserted values must be object or array of objects')
        }

        return this
    }


    update(values) {
        if (!values) throw new Error('Updated values is required')

        const { query } = this

        query.action = 'UPDATE'

        query.valuesToUpdate = Object.keys(values).map(el => `${el} = '${values[el]}'`).join()

        return this
    }


    select(values) {
        console.log(values)
        if(!values) throw new Error('Attributes is require for select')

        const { query } = this

        query.action = 'SELECT'

        if (typeof values === "string" && values.length) {
            query.atributes = values
        } else if (Array.isArray(values) && values.length) {
            query.atributes = getAttributes(values)
        } else {
            throw new Error('Selected values must be string or array of strings')
        }        

        return this
    } 


    where(values) {
        if (!values) throw new Error('Where no params')

        const { query } = this
        if (Array.isArray(values) && values.length) {
            query.where = `WHERE ${values.map(el => (`${Object.keys(el)[0]} = '${el[Object.keys(el)[0]]}'`)).join(' AND ')}`
        } else if (typeof values === "object" && Object.keys(values).length) {
            query.where = `WHERE ${Object.keys(values)[0]} = '${values[Object.keys(values)[0]]}'`
        } else {
            throw new Error('Where values must be object')
        }

        return this
    }


    order(attr, reverseOrder = false) {
        if (!attr) throw new Error('Pass attribute for sorting by it')

        const { query } = this
        query.order = `ORDER BY ${attr} ${reverseOrder ? 'DESC' : ''}`

        return this
    }


    limitOffset(limit, offset = null) {
        if(!limit) throw new Error('Enter limit')

        const { query } = this
        query.limit = `LIMIT ${limit}`
        if(offset) query.limit +=` OFFSET ${offset}`

        return this
    }


    build() {
        const { query } = this
        switch (query.action) {
            case 'SELECT':
                return `${query.action} ${query.atributes} FROM ${query.tableName} ${query.where} ${query.order} ${query.limit};`
                // return `${query.action} ${query.atributes} FROM ${query.tableName} ${query.where} LIMIT 10 OFFSET 1000;`

            case 'INSERT INTO':
                return `${query.action} ${query.tableName} ${query.valuesName} VALUES ${query.values} ${query.where};`

            case 'UPDATE':
                return `${query.action} ${query.tableName} SET ${query.valuesToUpdate} ${query.where};`
            
            default:
                break;
        }
    }
}


module.exports = QueryBuilder




// Helper functions

function getValuesName(values) {
    const str = Object.keys(values).map(el => `${el}`).join()
    return `(${str})`
}

function getValues(values, isArray = false) {
    if(isArray) {
        const keys = Object.keys(values[0])
        return values.map(el => {
            return `(${keys.map(el2 => `'${el[el2]}'`).join()})`    
        }).join()
    } else {
        const keys = Object.keys(values)
        return `(${keys.map(el => `'${values[el]}'`).join()})`
    }
}

function getAttributes(value) {
    return `${Object.keys(value).map(el => (`${value[el]}`)).join()}`
}