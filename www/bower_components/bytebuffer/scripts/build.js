/*
 Copyright 2013 Daniel Wirtz <dcode@dcode.io>

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

/**
 * @overview ByteBuffer.js Build Script (c) 2013 Daniel Wirtz <dcode@dcode.io>
 * Released under the Apache License, Version 2.0
 * see: https://github.com/dcodeIO/ByteBuffer.js for details
 */ //
var MetaScript = require("../../MetaScript/MetaScript.js"),
    path = require("path"),
    fs = require("fs");

var rootDir = path.join(__dirname, ".."),
    srcDir  = path.join(__dirname, "..", "src"),
    distDir = path.join(__dirname, "..", "dist"),
    pkg = require(path.join(rootDir, "package.json")),
    filename;

var scope = {
    VERSION    : pkg.version,           // Version
    
    // Encodings
    
    ENCODINGS  : true,                  // Include encodings in general (catches all)
    BASE64     : true,                  // Include base64 encoding
    BINARY     : true,                  // Include binary encoding
    DEBUG      : true,                  // Include debug encoding
    HEX        : true,                  // Include hex encoding
    UTF8       : true,                  // Include utf8 encoding (required for STRINGS)
    
    // Primitive types
    
    INTS       : true,                  // Include int types in general (catches all)
    INT8       : true,                  // Include int8/uint8
    INT16      : true,                  // Include int16/uint16
    INT32      : true,                  // Include int32/uint32
    INT64      : true,                  // Include int64/uint64 with Long.js
    
    FLOATS     : true,                  // Include float types in general (catches all)
    FLOAT32    : true,                  // Include float32
    FLOAT64    : true,                  // Include float64
    
    // Varint encoding
    
    VARINTS    : true,                  // Include varint encoding in general (catches all)
    VARINT32   : true,                  // Include varint32/zigZagVarint32
    VARINT64   : true,                  // Include varint64/zigZagVarint32 with Long.js
    
    // String support
    
    STRINGS    : true,                  // Include string support in general (catches all)
    UTF8STRING : true,                  // Include UTF8 encoded strings
    CSTRING    : true,                  // Include C-like null terminated strings
    VSTRING    : true,                  // Include varint32 length prefixed strings
    ISTRING    : true,                  // Include uint32 length prefixed strings
    
    // Other
    
    ALIASES    : true,                  // Include aliases like writeByte, writeShort ..
    BUFFERVIEW : false,                 // Include BufferView as ByteBuffer#view under node
    INLINE     : true,                  // Inline whatever possible for maximum performance
    VERBOSE_MS : false                  // Include MetaScript details as comments
};

// Optimize for size  : INLINE=false, ALIASES=false, VERBOSE_MS=false, WHATEVERYOUDONTNEED=false
// Optimize for speed : INLINE=true, BUFFERVIEW=false

if (!scope.UTF8) scope.STRINGS = false;

// Build node ByteBuffer
scope.NODE = true;
console.log("Building ByteBufferNB with scope", JSON.stringify(scope, null, 2));
fs.writeFileSync(
    path.join(distDir, "ByteBufferNB.js"),
    MetaScript.transform(fs.readFileSync(filename = path.join(srcDir, "ByteBufferNB.js")), filename, scope, srcDir)
);

// Build browser ByteBuffer
scope.NODE = false;
scope.DATAVIEW = true;
delete scope.BUFFERVIEW;
console.log("Building ByteBufferAB with scope", JSON.stringify(scope, null, 2));
fs.writeFileSync(
    path.join(distDir, "ByteBufferAB.js"),
    MetaScript.transform(fs.readFileSync(filename = path.join(srcDir, "ByteBufferAB.js")), filename, scope)
);

// Update bower.json
scope = { VERSION: pkg.version };
console.log("Updating bower.json with scope", JSON.stringify(scope, null, 2));
fs.writeFileSync(
    path.join(rootDir, "bower.json"),
    MetaScript.transform(fs.readFileSync(filename = path.join(srcDir, "bower.json")), filename, scope, srcDir)
);

console.log("Done");
