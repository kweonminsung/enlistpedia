from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Table, Date
from .database import Base
from sqlalchemy.orm import relationship


class Military_Type(Base):
    __tablename__ = 'type'
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True, unique=True)
    name = Column(String(3), nullable=False)

    specialty = relationship("Specialty", back_populates="type", cascade="all, delete")
    
class Specialty(Base):
    __tablename__ = 'specialty'
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True, unique=True)
    military_type_id = Column(Integer, ForeignKey('type.id'), nullable=False)
    
    name = Column(String(20), nullable=False)
    specialty_type = Column(Integer, nullable=False)
    mma_id = Column(String(10), nullable=False)
    perfect_score = Column(Integer, nullable=False)
    has_eligibility = Column(Boolean, nullable=False)
    comment = Column(String, nullable=True)
    info_url = Column(String, nullable=False)

    type = relationship("Military_Type", back_populates="specialty")
    recruit_results = relationship("Recruit_result", back_populates="specialty", cascade="all, delete")
    majors = relationship("SpecialtyMajor", back_populates="specialties", cascade="all, delete")
    certificates = relationship("SpecialtyCertificate", back_populates="specialties", cascade="all, delete")

    

class Recruit_result(Base):
    __tablename__ = 'recruit_result'

    id = Column(Integer, primary_key=True, index=True, autoincrement=True, unique=True)
    specialty_id = Column(Integer, ForeignKey("specialty.id"), nullable=False)
    enlist_date = Column(Date, nullable=False)
    min_score = Column(Integer, nullable=False)

    specialty = relationship("Specialty", back_populates="recruit_results")
    

class Major(Base):
    __tablename__ = 'major'
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True, unique=True)
    name = Column(String, nullable=False)

    specialties = relationship(
        'SpecialtyMajor', back_populates='majors', cascade="all, delete")
    
    
    
class Certificate(Base):
    __tablename__ = 'certificate'
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True, unique=True)
    name = Column(String, nullable=False)

    specialties = relationship(
        'SpecialtyCertificate', back_populates='certificates', cascade="all, delete")


class SpecialtyMajor(Base):
    __tablename__ = 'specialty_major'

    id = Column(Integer, primary_key=True, index=True, autoincrement=True, unique=True)

    specialty_id = Column(Integer, ForeignKey("specialty.id"), nullable=False)
    major_id = Column(Integer, ForeignKey("major.id"), nullable=False)
    is_direct = Column(Boolean, nullable=False)
    specialties = relationship(
        'Specialty',  back_populates='majors')
    majors = relationship(
        'Major',  back_populates='specialties')


class SpecialtyCertificate(Base):
    __tablename__ = 'specialty_certificate'

    id = Column(Integer, primary_key=True, index=True, autoincrement=True, unique=True)

    specialty_id = Column(Integer, ForeignKey("specialty.id"), nullable=False)
    certificate_id = Column(Integer, ForeignKey("certificate.id"), nullable=False)
    is_direct =  Column(Boolean, nullable=False)
    rank = Column(Integer, nullable=False)
    comment = Column(String, nullable=False)

    specialties = relationship(
        'Specialty',  back_populates='certificates')
    certificates = relationship(
        'Certificate',  back_populates='specialties')
    
class Hits(Base):
    __tablename__ = 'hits'
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True, unique=True)
    
    count = Column(Integer, nullable=False)