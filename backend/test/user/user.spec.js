"use strict"

const assert = require('assert')
const request = require('supertest')
const host = request("http://localhost:3000")

describe('users', function () {
    describe('GET', () => {
        it('Debe devolver los usuarios registrados en el sistema', (done) => {
            host.get('/psicoapp/v1/users')
                .expect('Content-Type', /json/)
                .expect(res => {
                    assert.strictEqual(res.body.ok, false)
                })
                .expect(200, done)
        });

    });

});