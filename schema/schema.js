const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLNonNull, GraphQLList, GraphQLSchema } = graphql
const _ = require('lodash')
const Book = require('../model/book.model')
const Author = require('../model/author.model')

// *******************************************************************************************************
// let books = [
//     {title: 'Half a Yellow Sun', genre: 'yellow', id: '1', authorId: '1'},
//     {title: 'Haba! Ojuolape', genre: 'oju', id: '2', authorId: '2'},
//     {title: 'The Beginning of the End', genre: 'end', id: '3', authorId: '2'}
// ]

// let authors = [
//     {name: 'Bola', age: 12, id: '1'},
//     {name: 'Sam', age: 13, id: '2'},
//     {name: 'Nike', age: 14, id: '3'}
// ]

// ********************************************************************************************************

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        genre: { type: GraphQLString },
        authors: {
            type: AuthorType,
            resolve(parent, args) {
                // return _.find(authors, {id: parent.authorId})
                return Author.findById(parent.authorId)
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: graphql.GraphQLID },
        name: { type: GraphQLString },
        age: { type: graphql.GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                // return _.filter(books, {authorId: parent.id})
                return Book.find({ authorId: parent.findById })
            }
        }
    })
})
// ***********************************************************************************************
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: new GraphQLNonNull ( GraphQLString) },
                age: { type: new GraphQLNonNull (GraphQLInt) }
            },            resolve(parent, args) {
                let author = new Author({
                    name: args.name,
                    age: args.age
                })
                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                title: { type: new GraphQLNonNull (GraphQLString ) },
                genre: { type: new GraphQLNonNull (GraphQLString) },
                authorId: { type: new GraphQLNonNull (GraphQLString) }
            },            resolve(parent, args) {
                let book = new Book({
                    title: args.title,
                    genre: args.genre,
                    authorId: args.authorId
                })
                return book.save();
            }
        }
    }
})
// ********************************************************************************************************
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // return _.find(books, {id: args.id})
                return Book.findById(args.id)
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // return _.find(authors, {id: args.id})
                return Author.findById(args.id)
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                // return (authors;
                return Book.find({})

            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                // return (authors;
                return Author.find({})

            }
        }
    }
    })
// ********************************************************************************************************

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})