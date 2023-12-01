export const POST = async (req) => {
    const data = await req.formData();
    if (data.get('file')) {
        //actualizo la foto
    }
    return Response.json(true);
}