from datetime import datetime
from fastapi import FastAPI
from fastapi import HTTPException
from pydantic import BaseModel
import traceback

app = FastAPI()


class Response(BaseModel):
    message: str


@app.get("/example", response_model=Response)
async def run():
    try:
        now_str = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        return { "message": f"{now_str}(UTC) [service2] Hello world!" }
    except Exception:    # raise on any error raised.
        raise HTTPException(status_code=500, detail=traceback.format_exc())
