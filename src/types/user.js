// [Member 1 - Core] Shared user types (JSDoc — no runtime cost).

/** @typedef {'admin' | 'user'} Role */

/**
 * @typedef {Object} User
 * @property {number} id
 * @property {string} name
 * @property {string} email
 * @property {Role} role
 */

/**
 * @typedef {Object} UserCreate
 * @property {string} name
 * @property {string} email
 * @property {string} password
 * @property {Role} [role]
 */

/**
 * @typedef {Object} UserUpdate
 * @property {string} [name]
 * @property {string} [email]
 * @property {string} [password]
 */
export {}
