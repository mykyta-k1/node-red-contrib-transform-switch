# node-red-contrib-transform-switch

A Node-RED node that combines data transformation and flow routing. It allows you to apply multiple operations to a single input and route the results to different output ports.

## The Problem

Using standard `change` nodes often requires transforming the same field into various results. As the number of these intermediate "mapping" operations increases, the flow becomes cluttered with numerous components. While moving these into sub-flows is a possible workaround, it merely delegates the complexity rather than solving the underlying structural issue.

### Example
![example](../assets/p7/example.png)

## The Idea

The `transform-switch` node integrates the logic of `change` (transformation) and `switch` (conditional routing) nodes into a single component.

### Visual Representation

```mermaid
flowchart LR
    A[Input Object] --> B{Operations}
    B --> C1[Operation 1<br>Result 1]
    B --> C2[Operation 2<br>Result 2]
    B --> C3[Operation 3<br>Result 3]
    C1 --> D1[Port 1]
    C2 --> D2[Port 2]
    C3 --> D3[Port 3]
```

## Pros
- **Scalability and Readability**: Improves flow clarity when multiple simple operations are performed on the same input object to distribute results.

## Cons
- **Limited to Simple Logic**: Due to its abstraction as a combination of two basic components, it is not suitable for highly complex logic.

---

## Installation

```bash
npm i ~/path/to/package
```
