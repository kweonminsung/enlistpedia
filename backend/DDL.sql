create table certificate
(
    id      int auto_increment
        primary key,
    name    varchar(20) null,
    `rank`  int         null,
    comment varchar(10) null,
    constraint certificate_id_uindex
        unique (id)
);

create table hits
(
    id    int auto_increment
        primary key,
    count int not null,
    constraint ix_hits_id
        unique (id)
);

create table major
(
    id   int auto_increment
        primary key,
    name varchar(20) not null,
    constraint major_id_uindex
        unique (id)
);

create table type
(
    id   int auto_increment
        primary key,
    name varchar(2) not null,
    constraint type_id_uindex
        unique (id)
);

create table specialty
(
    id               int auto_increment
        primary key,
    military_type_id int          not null,
    name             varchar(20)  not null,
    specialty_type   int          not null,
    mma_id           varchar(10)  not null,
    perfect_score    int          not null,
    has_eligibility  tinyint(1)   not null,
    comment          varchar(30)  null,
    info_url         varchar(255) not null,
    constraint specialty_id_uindex
        unique (id),
    constraint specialty_type_id_fk
        foreign key (military_type_id) references type (id)
            on update cascade on delete cascade
);

create table recruit_result
(
    id           int auto_increment
        primary key,
    specialty_id int         not null,
    enlist_date  varchar(20) not null,
    min_score    int         not null,
    constraint recruit_result_id_uindex
        unique (id),
    constraint recruit_result_specialty_id_fk
        foreign key (specialty_id) references specialty (id)
            on update cascade on delete cascade
);

create table specialty_certificate
(
    id             int auto_increment
        primary key,
    specialty_id   int        not null,
    certificate_id int        not null,
    is_direct      tinyint(1) not null,
    constraint specialty_certificate_id_uindex
        unique (id),
    constraint specialty_certificate_certificate_id_fk
        foreign key (certificate_id) references certificate (id)
            on update cascade on delete cascade,
    constraint specialty_certificate_specialty_id_fk
        foreign key (specialty_id) references specialty (id)
            on update cascade on delete cascade
);

create table specialty_major
(
    id           int auto_increment
        primary key,
    specialty_id int        not null,
    major_id     int        not null,
    is_direct    tinyint(1) not null,
    constraint specialty_major_id_uindex
        unique (id),
    constraint specialty_major_major_id_fk
        foreign key (major_id) references major (id)
            on update cascade on delete cascade,
    constraint specialty_major_specialty_id_fk
        foreign key (specialty_id) references specialty (id)
            on update cascade on delete cascade
);

