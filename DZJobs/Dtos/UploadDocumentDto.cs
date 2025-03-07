namespace HCMS.Api.Dto;

public record DocumentEndpointRootPath(string Path);
public record UploadDocumentDto(IFormFile File);
public record class DocumentMetadataDto(string Id);