export interface ReqPageable {
    content:          [];
    pageable:         Pageable;
    last:             boolean;
    totalPages:       number;
    totalElements:    number;
    size:             number;
    number:           number;
    sort:             Sort;
    first:            boolean;
    numberOfElements: number;
    empty:            boolean;
}

// interface Content {
//     idMedico:  number;
//     nombres:   string;
//     apellidos: string;
// }

interface Pageable {
    pageNumber: number;
    pageSize:   number;
    sort:       Sort;
    offset:     number;
    paged:      boolean;
    unpaged:    boolean;
}

interface Sort {
    empty:    boolean;
    sorted:   boolean;
    unsorted: boolean;
}