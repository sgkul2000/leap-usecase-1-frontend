import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const markdown = `
# Usecase 1: Item Management
## Models

Item:

 - ItemID
 - ItemName
 - ItemStatus
	 -  Active, Inactive, Out Of stock, Online, Store Only
- ItemPrice

ItemCategory
- CategoryID
- Category Name
- Category Description


Store
- StoreID
- StoreLocation
- Quantity


## Features to be implemented

1. Create an Item
2. Retrieve all Item details
3. Retrieve all Item details by Category
4. Retrieve details of one item with all details
5. update and delete and Item
`

const Dashboard = () => {
  return (
    <div>
      {/* Card widget */}
      <ReactMarkdown className="prose mt-10" children={markdown} remarkPlugins={[remarkGfm]} />
    </div>
  );
};

export default Dashboard;
