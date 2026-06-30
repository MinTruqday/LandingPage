import os
import chromadb
from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import CharacterTextSplitter
from sentence_transformers import SentenceTransformer

class RAGSystem:
    def __init__(self, data_path="data/knowledge.txt", db_path="./chroma_db"):
        self.data_path = data_path
        self.db_path = db_path
        self.collection_name = "iphone_knowledge"
        
        self.chroma_client = chromadb.PersistentClient(path=self.db_path)
        self.embedding_model = SentenceTransformer('all-MiniLM-L6-v2')
        
        try:
            self.collection = self.chroma_client.get_collection(name=self.collection_name)
        except Exception:
            self.collection = self.chroma_client.create_collection(name=self.collection_name)
            self.load_and_embed_data()
            
    def load_and_embed_data(self):
        if not os.path.exists(self.data_path):
            return
            
        loader = TextLoader(self.data_path, encoding='utf-8')
        documents = loader.load()
        
        text_splitter = CharacterTextSplitter(separator="\n", chunk_size=200, chunk_overlap=20)
        docs = text_splitter.split_documents(documents)
        
        texts = [doc.page_content for doc in docs]
        ids = [str(i) for i in range(len(texts))]
        
        embeddings = self.embedding_model.encode(texts).tolist()
        
        self.collection.add(
            embeddings=embeddings,
            documents=texts,
            ids=ids
        )
        
    def retrieve(self, query: str, top_k: int = 3) -> str:
        if not self.collection:
            return ""
            
        query_embedding = self.embedding_model.encode([query]).tolist()
        results = self.collection.query(
            query_embeddings=query_embedding,
            n_results=top_k
        )
        
        if results and results['documents']:
            docs = results['documents'][0]
            return "\n".join(docs)
        return ""

rag_system = RAGSystem()
